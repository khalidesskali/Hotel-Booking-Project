<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SignupController;

Route::post('/signup', [SignupController::class, 'store']);