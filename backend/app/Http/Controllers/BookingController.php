<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\Room;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bookings = Booking::all();

        return response()->json($bookings, 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        // Validate data
        $validateData = $request->validate([
            'user_id' => 'required|numeric|exists:users,id',
            'room_id' => 'required|numeric|exists:rooms,id',
            'check_in' => 'required|date|after_or_equal:today',
            'check_out' => 'required|date|after:check_in',
            'price' => 'required|numeric|min:0'
        ]);

        // Create booking row
        $booking = Booking::create([
            'user_id' => $validateData['user_id'],
            'room_id' => $validateData['room_id'],
            'check_in' => $validateData['check_in'],
            'check_out' => $validateData['check_out'],
            'total_price' => $validateData['price'],
        ]);

        // Format data
        $bookingFormat = [
            'id' => $booking->id,
            'userId' => $booking->user_id,
            'roomId' => $booking->room_id,
            'checkIn' => $booking->check_in,
            'checkOut' => $booking->check_out,
            'price' => $booking->total_price,
        ];

        return response()->json([
            'message' => 'The room is booked successfully',
            'booking' => $bookingFormat],
            200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
       $booking = Booking::find($id);

       if (!$booking) {
        return response()->json(['message' => 'booking not found'], 404);
       }

       $bookingFormat = [
        'id' => $booking->id,
        'userId' => $booking->user_id,
        'roomId' => $booking->room_id,
        'checkIn' => $booking->check_in,
        'checkOut' => $booking->check_out,
        'price' => $booking->total_price,
        ];

       return response()->json($bookingFormat, 201);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //    
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id){

        $booking = Booking::find($id);

        // If booking not found, return a 404 response
        if (!$booking) {
            return response()->json(['message' => 'Booking not found'], 404);
        }

        // Validate the request data
        $request->validate([
            'status' => 'required|string|in:pending,confirmed,canceled',
        ]);

        // Update the booking status
        $booking->update([
            'status' => $request->input('status')
        ]);

        // Return a success response
        return response()->json(['message' => 'Booking updated successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $booking = Booking::find($id);

        if (!$booking) {
            return response()->json(['message' => 'booking not found'], 404);
        }

        $booking->delete();

        return response()->json(['message' => 'Booking deleted successfully!'], 200); 
    }

    // Method to get a room associated to a certain booking
    public function getRoom ($id) {

        $booking = Booking::find($id);

        if (!$booking) {
            return response()->json(['message' => 'Booking not found'], 404);
        }

        $roomId = $booking->room_id;
        $room = Room::find($roomId);

        if (!$room) {
            return response()->json(['message' => 'Room not found for this booking'], 404);
        }

        return response()->json($room, 200);
    }
}
