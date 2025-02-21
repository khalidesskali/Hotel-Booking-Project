import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BookingSuccess = () => {
  const [invoice, setInvoice] = useState(null);
  const [bookingId, setBookingId] = useState("");
  const [roomId, setRoomId] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/payments/${id}`
        );
        if (response.data.booking_id !== bookingId) {
          setBookingId(response.data.booking_id);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (!bookingId) return;
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/bookings/${bookingId}`
        );
        setInvoice(response.data);
        if (response.data.room_id !== roomId) {
          setRoomId(response.data.roomId);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchInvoice();
  }, [bookingId]);

  useEffect(() => {
    if (!roomId) return;
    const fetchRoom = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/rooms/${roomId}`
        );
        setInvoice((prevInvoice) => ({
          ...prevInvoice,
          room_name: response.data.roomType,
          price: response.data.price,
        }));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchRoom();
  }, [roomId]);

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-10 p-6">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Booking Success
      </h1>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Invoice</h2>
      <p className="text-gray-600 mb-2">
        <strong>Room Name:</strong> {invoice?.room_name}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Price:</strong> {invoice?.price}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Check-in Date:</strong> {invoice?.checkIn}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Check-out Date:</strong> {invoice?.checkOut}
      </p>
      <button
        // onClick={handleDownloadPDF}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
      >
        Download PDF
      </button>
    </div>
  );
};

export default BookingSuccess;
