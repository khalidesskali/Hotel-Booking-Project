<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Room;
use Illuminate\Database\Seeder;

class RoomSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        Room::create([
            'room_number' => '101',
            'image' => '../src/images/deluxe-suite.jpg',
            'room_type' => 'Deluxe Suite',
            'price_per_night' => 250,
            'description' => 'A luxurious suite with ocean view, king-size bed, and private balcony'
        ]);

        Room::create([
            'room_number' => '102',
            'image' => '../src/images/standard-room.jpg',
            'room_type' => 'Standard Room',
            'price_per_night' => 250,
            'description' => 'A comfortable room with all basic amenities for a pleasant stay'
        ]);

        Room::create([
            'room_number' => '103',
            'image' => '../src/images/family-room.jpg',
            'room_type' => 'Family Room',
            'price_per_night' => 180,
            'description' => 'Spacious room perfect for families with kids, includes bunk beds and a play are'
        ]);

        Room::create([
            'room_number' => '104',
            'image' => '../src/images/Penthouse-Suite.jpeg',
            'room_type' => 'Presidential Suite',
            'price_per_night' => 500,
            'description' => 'An opulent suite with a private jacuzzi, personal butler, and stunning views'
        ]);

        Room::create([
            'room_number' => '105',
            'image' => '../src/images/single-room.webp',
            'room_type' => 'Single Room',
            'price_per_night' => 90,
            'description' => 'A cozy single room ideal for solo travelers'
        ]);

        Room::create([
            'room_number' => '106',
            'image' => '../src/images/double-room.jpg',
            'room_type' => 'Double Room',
            'price_per_night' => 140,
            'description' => 'Perfect for couples, featuring a queen-size bed and city view'
        ]);

        Room::create([
            'room_number' => '107',
            'image' => '../src/images/Penthouse-Suite.jpeg',
            'room_type' => 'Penthouse Suite',
            'price_per_night' => 700,
            'description' => 'A luxurious top-floor suite with private elevator access and stunning panoramic views'
        ]);
    }
}