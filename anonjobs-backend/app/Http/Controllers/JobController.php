<?php

namespace App\Http\Controllers;

use App\Http\Requests\JobRequest;
use App\Http\Resources\JobResource;
use App\Http\Resources\JobTagResource;
use App\Models\Job;
use App\Models\Tag;
use App\Services\ImageService;
use App\Services\JobService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

use function JmesPath\search;

class JobController extends Controller
{
    /**
     * Get all Jobs
     */
    public function getJobs(Request $request, JobService $jobService)
    {
        $jobService->updatePinnedJobs();
        $searchFilter = $request['filters']['search'] ?? null;
        $tagFilter = $request['filters']['tag'] ?? null;
        $isAnonFilter = $request['filters']['isAnon'] ?? null;
        $isRemoteFilter = $request['filters']['isRemote'] ?? null;

        $jobs = Job::active()->withFilters(
            $searchFilter,
            $tagFilter,
            $isAnonFilter,
            $isRemoteFilter
        )
            ->orderBy('is_pinned', 'desc')->orderBy('created_at', 'desc')->paginate(35);
            
        return JobResource::collection($jobs)->additional(['s'=>'s']);
    }

    /**
     * Get all Jobs by Company
     */
    public function getJobsByCompany($companySlug)
    {
        $jobs = Job::where('company_slug', $companySlug)->orderBy('created_at', 'desc')->paginate(35);
        return JobResource::collection($jobs);
    }

    /**
     * Store Job
     */
    public function store(JobRequest $request, JobService $jobService, ImageService $imageService)
    {
        try {
            $data = $jobService->prepareData($request->validated(), $imageService);
            $job = Job::create($data);

            $job->tags()->attach($data['tags']);

            return response()->json([
                'job_id' => $job->_id,
                'position_slug' => createSlug($job->position),
                'message' => 'Job created successfully.'
            ], 200);
        } catch (\Exception $e) {
            return response([
                'message' => 'Something went wrong! Please try again.'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

     /**
     * Update Job
     */
    public function update($id, JobRequest $request, JobService $jobService, ImageService $imageService)
    {
        try {
            $job = Job::find($id);
            $data = $jobService->prepareData($request->validated(), $imageService, $job, true);
            $job->update($data);

            $job->tags()->sync($data['tags']);

            return response()->json([
                'job_id' => $job->_id,
                'position_slug' => createSlug($job->position),
                'message' => 'Job updated successfully.'
            ], 200);
        } catch (\Exception $e) {
            return response([
                'message' => 'Something went wrong! Please try again.'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show($id)
    {
        // return $id;
        return new JobResource(Job::active()->find($id));
    }
    
    /**
     * Return Jobs' Tags
     */
    public function getJobTags()
    {
        return Tag::where('job_ids', '!=', null)->orderBy('name', 'asc')->get(['name']);
    }
}
