<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Room extends Model
{
    use HasFactory;

    public function bookings () {
        return $this->hasMany(Booking::class);
    }

    public function specialOffers () {
        return $this->hasMany(SpecialOffer::class);
    }
}