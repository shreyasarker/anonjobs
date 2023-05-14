<?php

namespace App\Services;

use App\Models\Job;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class JobService
{
    public function prepareData($request, $imageService, $job=null, $updateMode=false)
    {
        $existingCompanyLogo =  $job ? $job->company_logo : null;
        $request['company_slug'] =  createSlug($request['company']);
        if ($request['is_crypto_salary'] === 'No') {
            $request['crypto_salary_type'] = null;
        }
        if ($request['company_logo'] !== null) {
            if($existingCompanyLogo){
                $imageService->removeImage($existingCompanyLogo);
            }
            $request['company_logo'] = $imageService->uploadImage($request['company_logo'], $request['company'], config('app.env').'-'.'company-logos');
        }
        if($updateMode && $request['company_logo']===null){
            $request['company_logo'] = $existingCompanyLogo;
        }

        if(!$job){
            switch ($request['pin_duration']) {
                case 1:
                    $request['is_pinned'] = 1;
                    $request['pinned_deadline'] = Carbon::now()->addDay(1)->format('Y-m-d H:i:s');
                    break;
                case 7:
                    $request['is_pinned'] = 1;
                    $request['pinned_deadline'] = Carbon::now()->addDays(7)->format('Y-m-d H:i:s');
                    break;
                case 30:
                    $request['is_pinned'] = 1;
                    $request['pinned_deadline'] = Carbon::now()->addDays(30)->format('Y-m-d H:i:s');
                    break;
                default:
                    $request['is_pinned'] = 0;
                    $request['pinned_deadline'] = null;
                    break;
            }
            switch ($request['job_highlight_color_type']) {
                case 'No':
                    $request['job_higlight_color'] = '#000000';
                    break;
                case 'Basic':
                    $request['job_higlight_color'] = '#534388';
                    break;
            }
        }
        $request['user_id'] = Auth::user()->_id;
        $request['is_active'] = 1;
        return $request;
    }

    public function updatePinnedJobs()
    {
        return Job::active()->pinned()
        ->where('pinned_deadline', '<', Carbon::now()->format('Y-m-d H:i:s'))
        ->update([
            'is_pinned' => 0,
            'pinned_deadline' => null
        ]);
    }
}
