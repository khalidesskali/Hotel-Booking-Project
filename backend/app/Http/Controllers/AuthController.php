<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request) {
        $validatedData = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required',
        ]);

        // Check if the email exists
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            throw ValidationException::withMessages(([
                'email' => 'The provided email is incorrect',
            ]));
        }

        if (!Auth::attempt(['email' => $validatedData['email'], 'password' => $validatedData['password']])) {
            throw ValidationException::withMessages([
                'password' => ['The provided password is incorrect.'],
            ]);
        }

        $getUser = Auth::user();
        $user = [
            'id' => $getUser->id,
            'name' => $getUser->name,
            'role' => $getUser->role
        ];
        $token = $getUser->createToken('auth_token')->plainTextToken;

        return response()->json(compact('user', 'token'), 200);
    }

    public function user(Request $request) {
        return response()->json($request->user());
    }

    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'User logged out successfully']);
    }
}