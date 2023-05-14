<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    public function showAuthUser(Request $request)
    {
        return response()->json([
            'user' => ['role' =>  $request->user()->role]
        ], 200);
    }
}
