<?php

namespace App\Http\Controllers;

use App\Http\Resources\YearlySalaryResource;
use App\Models\YearlySalary;
use Illuminate\Http\Request;

class YearlySalaryController extends Controller
{
    /**
     * Return all Yearly Salaries
     */
    public function index()
    {
        return YearlySalaryResource::collection(YearlySalary::query()->get());
    }
}
