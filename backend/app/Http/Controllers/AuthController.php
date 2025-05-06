<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
  

    public function login(Request $request) {
        try {
            $validatedData = $request->validate([
                'email' => 'required|string|email',
                'password' => 'required|string',
            ]);

            // Check if the email exists
            $user = User::where('email', $validatedData['email'])->first();
            
            if (!$user) {
                throw ValidationException::withMessages([
                    'email' => ['The provided email is incorrect.'],
                ]);
            }

            // Verify password
            if (!Hash::check($validatedData['password'], $user->password)) {
                throw ValidationException::withMessages([
                    'password' => ['The provided password is incorrect.'],
                ]);
            }

            // Create access token
            $token = $user->createToken('auth_token')->plainTextToken;
            
            // Create refresh token
            $refreshToken = Str::random(64);
            $user->refresh_token = $refreshToken;
            $user->refresh_token_expires_at = now()->addDays(30);
            $user->save();

            // Prepare user data
            $userData = [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at
            ];

            return response()->json([
                'user' => $userData,
                'token' => $token,
                'refresh_token' => $refreshToken,
                'message' => 'Login successful'
            ], 200);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'The given data was invalid.',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred during login.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function refreshToken(Request $request) {
        try {
            $request->validate([
                'refresh_token' => 'required|string'
            ]);

            $user = User::where('refresh_token', $request->refresh_token)
                       ->where('refresh_token_expires_at', '>', now())
                       ->first();

            if (!$user) {
                return response()->json([
                    'message' => 'Invalid or expired refresh token'
                ], 401);
            }

            // Create new access token
            $token = $user->createToken('auth_token')->plainTextToken;

            // Create new refresh token
            $refreshToken = Str::random(64);
            $user->refresh_token = $refreshToken;
            $user->refresh_token_expires_at = now()->addDays(30);
            $user->save();

            return response()->json([
                'token' => $token,
                'refresh_token' => $refreshToken
            ], 200);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'The given data was invalid.',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while refreshing token.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function user(Request $request) {
        try {
            $user = $request->user();
            if (!$user) {
                return response()->json([
                    'message' => 'User not authenticated'
                ], 401);
            }

            return response()->json([
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'created_at' => $user->created_at,
                    'updated_at' => $user->updated_at
                ]
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while fetching user data.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function logout(Request $request) {
        try {
            if (!$request->user()) {
                return response()->json([
                    'message' => 'Unauthorized'
                ], 401);
            }

            // Delete current access token
            $request->user()->currentAccessToken()->delete();

            // Clear refresh token
            $user = $request->user();
            $user->refresh_token = null;
            $user->refresh_token_expires_at = null;
            $user->save();

            return response()->json([
                'message' => 'User logged out successfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred during logout.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}