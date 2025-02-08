<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => (int) $this->id,
            'bookingId' => (int) $this->booking_id,
            'paymentMethod' => $this->payment_method ?? 'unknown',
            'amount' => (float) $this->amount ?? 0.0,
            'paymentStatus' => $this->payment_status ?? 'pending',
        ];
    }
}
