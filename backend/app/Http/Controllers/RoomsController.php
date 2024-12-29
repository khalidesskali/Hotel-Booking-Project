<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoomResource;
use App\Models\Room;

class RoomsController extends Controller {
    public function rooms () {
        $rooms = Room::all();

        return RoomResource::collection($rooms);
    }
}