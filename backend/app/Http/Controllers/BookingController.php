<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;

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
        $validateData = $request->validate([
            'user_id' => 'required|numeric|exists:users,id',
            'room_id' => 'required|numeric|exists:rooms,id',
            'check_in' => 'required|date|after_or_equal:today',
            'check_out' => 'required|date|after:check_in',
            'price' => 'required|numeric|min:0'
        ]);

        $booking = Booking::create([
            'user_id' => $validateData['user_id'],
            'room_id' => $validateData['room_id'],
            'check_in' => $validateData['check_in'],
            'check_out' => $validateData['check_out'],
            'total_price' => $validateData['price'],
        ]);

        return response()->json(['message' => 'The room is booked successfully','booking' => $booking], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
       
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
        //
    }
}
