<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoomResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'roomNumber' => (int) $this->room_number,
            'roomType' => $this->room_type,
            'imageSrc' => $this->image,
            'price' => (float) $this->price_per_night,
            'description' => $this->description,
            'availability' => (boolean) $this->availability
        ];
    }
}