<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Room;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class RoomSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
      
        // $rooms = [
        //     ['room_number' => '101', 'room_type' => 'Deluxe Suite', 'price_per_night' => 250.00, 'availability' => 1, 'description' => 'Spacious deluxe suite with luxurious amenities.', 'image' => '../src/images/deluxe-suite.jpg', 'baths' => 1, 'area' => 50, 'guests' => 2, 'bathrooms' => 1],
        //     ['room_number' => '102', 'room_type' => 'Standard Room', 'price_per_night' => 250.00, 'availability' => 1, 'description' => 'Comfortable standard room for business or leisure stays.', 'image' => '../src/images/standard-room.jpg', 'baths' => 1, 'area' => 30, 'guests' => 2, 'bathrooms' => 1],
        //     ['room_number' => '103', 'room_type' => 'Family Room', 'price_per_night' => 180.00, 'availability' => 1, 'description' => 'Family room with ample space and amenities for a family stay.', 'image' => '../src/images/family-room.jpg', 'baths' => 1, 'area' => 40, 'guests' => 4, 'bathrooms' => 1],
        //     ['room_number' => '104', 'room_type' => 'Presidential Suite', 'price_per_night' => 500.00, 'availability' => 1, 'description' => 'Exclusive presidential suite with stunning views.', 'image' => '../src/images/Penthouse-Suite.jpeg', 'baths' => 2, 'area' => 100, 'guests' => 4, 'bathrooms' => 2],
        //     ['room_number' => '105', 'room_type' => 'Single Room', 'price_per_night' => 90.00, 'availability' => 1, 'description' => 'Compact room ideal for single travelers.', 'image' => '../src/images/single-room.webp', 'baths' => 1, 'area' => 20, 'guests' => 1, 'bathrooms' => 1],
        //     ['room_number' => '106', 'room_type' => 'Double Room', 'price_per_night' => 140.00, 'availability' => 1, 'description' => 'A cozy room perfect for couples.', 'image' => '../src/images/double-room.jpg', 'baths' => 1, 'area' => 30, 'guests' => 2, 'bathrooms' => 1],
        //     ['room_number' => '107', 'room_type' => 'Penthouse Suite', 'price_per_night' => 700.00, 'availability' => 1, 'description' => 'Luxurious penthouse suite with breathtaking views.', 'image' => '../src/images/Penthouse-Suite.jpeg', 'baths' => 3, 'area' => 150, 'guests' => 5, 'bathrooms' => 3],
        //     ['room_number' => '108', 'room_type' => 'Serene Standard Room', 'price_per_night' => 120.00, 'availability' => 1, 'description' => 'A peaceful room with a modern touch.', 'image' => '../src/images/standard_room_1.jpg', 'baths' => 1, 'area' => 30, 'guests' => 2, 'bathrooms' => 1],
        //     ['room_number' => '109', 'room_type' => 'Romantic Double Retreat', 'price_per_night' => 150.00, 'availability' => 1, 'description' => 'An intimate double room for romantic getaways.', 'image' => '../src/images/double-room-1.webp', 'baths' => 1, 'area' => 35, 'guests' => 2, 'bathrooms' => 1],
        //     ['room_number' => '110', 'room_type' => 'Prestige Suite', 'price_per_night' => 250.00, 'availability' => 1, 'description' => 'Elegantly designed suite with a touch of luxury.', 'image' => '../src/images/suite-room-1.jpg', 'baths' => 1, 'area' => 60, 'guests' => 2, 'bathrooms' => 1],
        //     ['room_number' => '111', 'room_type' => 'Cozy Family Haven', 'price_per_night' => 180.00, 'availability' => 1, 'description' => 'Comfortable family room for a relaxing stay.', 'image' => '../src/images/family-room-1.jpg', 'baths' => 1, 'area' => 40, 'guests' => 4, 'bathrooms' => 1],
        //     ['room_number' => '112', 'room_type' => 'Family Comfort Retreat', 'price_per_night' => 200.00, 'availability' => 1, 'description' => 'A family-friendly room offering relaxation and comfort.', 'image' => '../src/images/family-room-2.jpg', 'baths' => 1, 'area' => 45, 'guests' => 4, 'bathrooms' => 1],
        //     ['room_number' => '113', 'room_type' => 'Double Comfort Oasis', 'price_per_night' => 125.00, 'availability' => 1, 'description' => 'A peaceful double room with cozy amenities.', 'image' => '../src/images/double-room-2.jpg', 'baths' => 1, 'area' => 30, 'guests' => 2, 'bathrooms' => 1],
        //     ['room_number' => '114', 'room_type' => 'Opulent Suite Escape', 'price_per_night' => 280.00, 'availability' => 1, 'description' => 'An opulent suite offering ultimate comfort and style.', 'image' => '../src/images/suite-room-2.jpg', 'baths' => 2, 'area' => 70, 'guests' => 3, 'bathrooms' => 2],
        //     ['room_number' => '115', 'room_type' => 'Standard Haven of Comfort', 'price_per_night' => 105.00, 'availability' => 1, 'description' => 'A cozy standard room with modern amenities.', 'image' => '../src/images/standard_room_2.webp', 'baths' => 1, 'area' => 25, 'guests' => 2, 'bathrooms' => 1],
        //     ['room_number' => '116', 'room_type' => 'The Family Getaway Nest', 'price_per_night' => 220.00, 'availability' => 1, 'description' => 'A family room designed for relaxation and togetherness.', 'image' => '../src/images/family-room-3.webp', 'baths' => 1, 'area' => 50, 'guests' => 4, 'bathrooms' => 1],
        //     ['room_number' => '117', 'room_type' => 'Luxury Double Delight', 'price_per_night' => 160.00, 'availability' => 1, 'description' => 'A luxurious double room with extra amenities.', 'image' => '../src/images/double-room-3.jpg', 'baths' => 1, 'area' => 35, 'guests' => 2, 'bathrooms' => 1],
        //     ['room_number' => '118', 'room_type' => 'Signature Suite Bliss', 'price_per_night' => 300.00, 'availability' => 1, 'description' => 'Exclusive suite with signature design and top-notch facilities.', 'image' => '../src/images/suite-room-3.webp', 'baths' => 2, 'area' => 90, 'guests' => 4, 'bathrooms' => 2],
        //     ['room_number' => '119', 'room_type' => 'Elegant Standard Retreat', 'price_per_night' => 130.00, 'availability' => 1, 'description' => 'An elegant room offering comfort and luxury at an affordable price.', 'image' => '../src/images/standard_room_3.jpg', 'baths' => 1, 'area' => 30, 'guests' => 2, 'bathrooms' => 1],
        //     ['room_number' => '120', 'room_type' => 'Classic Family Suite', 'price_per_night' => 195.00, 'availability' => 1, 'description' => 'A classic family suite perfect for long stays.', 'image' => '../src/images/family-room-4.jpeg', 'baths' => 1, 'area' => 50, 'guests' => 4, 'bathrooms' => 1],
        //     ['room_number' => '121', 'room_type' => 'Classic Double Serenity', 'price_per_night' => 135.00, 'availability' => 1, 'description' => 'A peaceful double room for a serene getaway.', 'image' => '../src/images/double-room-4.jpg', 'baths' => 1, 'area' => 30, 'guests' => 2, 'bathrooms' => 1],
        //     ['room_number' => '122', 'room_type' => 'Executive Suite Comfort', 'price_per_night' => 400.00, 'availability' => 1, 'description' => 'Executive suite with premium services and a stunning view.', 'image' => '../src/images/executive-suite.jpg', 'baths' => 2, 'area' => 80, 'guests' => 3, 'bathrooms' => 2],
        // ];

        // foreach ($rooms as $room) {
        //     DB::table('rooms')->updateOrInsert(
        //         ['room_number' => $room['room_number']], 
        //         $room 
        //     );
        // }
    }
}