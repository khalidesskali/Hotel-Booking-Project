<?php

namespace App\Http\Controllers;

use App\Http\Resources\PaymentResource;
use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate data before creation
        $validateData = $request->validate([
            'bookingId' => 'required|exists:bookings,id',
            'paymentMethod' => 'required|string|in:credit_card,paypal',
            'amount' => 'required|numeric|min:0',
        ]);

        // Convert camelCase to snake_case before saving to the database
        $dataForCreation = [
            'booking_id' => $validateData['bookingId'],
            'payment_method' => $validateData['paymentMethod'],
            'amount' => $validateData['amount'],
        ];

        // create Payment
        $payment = Payment::create($dataForCreation);

        return (new PaymentResource($payment))->response()->setStatusCode(201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $payment = Payment::find($id);

        if (!$payment) {
            return response()->json(['message' => 'payment not found'], 404);
        }

        return response()->json( $payment, 200);
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
    public function update(Request $request, string $id)
    {
        $payment = Payment::find($id);

        // Raise an error if no booking found for the immediate id
        if (!$payment) {
            return response()->json(['message' => 'no booking found for this id'], 404);
        }

        // Validate the request credentials
        $request->validate([
            'payment_status' => 'required|string|in:pending,complete,failed'
        ]);

        // Update the value
        $payment->update([
            'payment_status' => $request->input('payment_status')
        ]);

        return (new PaymentResource($payment))->response()->setStatusCode(200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
