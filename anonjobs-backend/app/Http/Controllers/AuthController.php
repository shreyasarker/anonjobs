<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(UserRequest $request)
    {
        $user = User::create($request->validated() + ['role' => 'employer']);

        return response([
            'message' => 'Registration done successfully.',
            'user' => ['role' => $user->role],
        ], Response::HTTP_CREATED);
        return response([
            'message' => 'Something went wrong! Please try again.'
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:8'
        ]);
        
        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid Credentials'
            ], Response::HTTP_UNAUTHORIZED);
        }

        $token = $user->createToken('anonjobs-app-api')->plainTextToken;

        return response()->json([
            'message' => 'Login done Successfully.',
            'user' => ['role' => $user->role],
            'token' => $token
        ], Response::HTTP_OK);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response([
            'message' => 'Logged out successfully.'
        ], Response::HTTP_OK);
    }
}
