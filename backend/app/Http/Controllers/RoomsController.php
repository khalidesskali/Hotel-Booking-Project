<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoomResource;
use App\Models\Room;

class RoomsController extends Controller {
    public function rooms () {
        $rooms = Room::all();

        return RoomResource::collection($rooms);
    }

    public function show($id)  {
        $room = Room::find($id);
    
        if (!$room) {
            return response()->json(['message' => 'Room not found'], 404);
        }

        $roomCamelCase = [
            'id' => $room->id,
            'roomNumber' => (int) $room->room_number,
            'roomType' => $room->room_type,
            'imageSrc' => $room->image,
            'price' => (float) $room->price_per_night,
            'description' => $room->description,
            'availability' => (boolean) $room->availability,
            'bath' => (int) $room->baths,
            'area' => (int) $room->area,
            'guests' => (int) $room->guests,
            'bathroom' => (int) $room->bathrooms
        ];

        return response()->json($roomCamelCase, 200);
    }
}