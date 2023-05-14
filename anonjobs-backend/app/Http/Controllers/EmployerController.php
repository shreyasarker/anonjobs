<?php

namespace App\Http\Controllers;

use App\Http\Resources\JobResource;
use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EmployerController extends Controller
{
    /**
     * Get all Jobs of Authenticated Employer
     */
    public function getJobs(Request $request)
    {
        $jobs = Job::ofAuthUser()->orderBy('created_at', 'desc')->paginate(35);
        return JobResource::collection($jobs)->additional(['user_email' => Auth::user()->email]);
    }
}
