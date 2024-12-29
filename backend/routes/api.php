<?php

use App\Http\Controllers\RoomsController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SignupController;

Route::post('/signup', [SignupController::class, 'store']);

Route::get('/rooms', [RoomsController::class, 'rooms']);