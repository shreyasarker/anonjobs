<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmployerController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\YearlySalaryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', [AuthController::class, 'login'])->name('login');
Route::post('register', [AuthController::class, 'register'])->name('register');
Route::post('logout', [AuthController::class, 'logout']);

Route::group(['prefix' => 'frontend'], function(){

    Route::get('tags', [TagController::class, 'index']);
    Route::get('jobs/tags', [JobController::class, 'getJobTags']);
    Route::get('yearly-salaries', [YearlySalaryController::class, 'index']);

    Route::post('jobs', [JobController::class, 'getJobs']);
    Route::get('jobs/show/{id}', [JobController::class, 'show']);
    Route::get('jobs/company/{slug}', [JobController::class, 'getJobsByCompany']);
});



Route::group(['prefix' => 'backend', 'middleware' => ['auth:sanctum']], function(){

    Route::get('users/me', [UserController::class, 'showAuthUser']);
    Route::post('jobs', [JobController::class, 'store']);
    Route::put('jobs/{id}', [JobController::class, 'update']);
    Route::get('employers/jobs', [EmployerController::class, 'getJobs']);
});
