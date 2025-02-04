<?php

use App\Http\Controllers\RoomsController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SignupController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BookingController;

// Signup Route
Route::post('/signup', [SignupController::class, 'store']);

// Login Route
Route::post('/login', [AuthController::class, 'login']);

// Authenticated Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

// Rooms Route
Route::get('/rooms', [RoomsController::class, 'rooms']);

// Single Room Route
Route::get('/rooms/{id}', [RoomsController::class, 'show']);

// Route users
Route::apiResource('users', UserController::class)->only('index', 'show', 'delete');

// Bookings Route
Route::apiResource('bookings', BookingController::class);