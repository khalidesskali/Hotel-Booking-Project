import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { jsPDF } from "jspdf";
import {
  FaFileInvoice,
  FaDollarSign,
  FaCalendarCheck,
  FaDownload,
  FaBed,
} from "react-icons/fa";

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

  const handleDownloadPDF = () => {
    if (!invoice) return;

    const doc = new jsPDF();

    // Set title with styling
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text("Booking Invoice", 20, 20);

    // Draw a line below the title
    doc.setDrawColor(0, 0, 0);
    doc.line(20, 25, 190, 25);

    // Table Headers
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255); // White text
    doc.setFillColor(0, 102, 204); // Blue background
    doc.rect(20, 30, 170, 10, "F"); // Rectangle for header

    doc.text("Booking Details", 25, 37);

    // Reset styles for data
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);

    // Table Data
    const startY = 45;
    const lineHeight = 10;
    const tableData = [
      ["Room Name", invoice.room_name || "N/A"],
      ["Price", `$${invoice.price || "N/A"}`],
      ["Check-in Date", invoice.checkIn || "N/A"],
      ["Check-out Date", invoice.checkOut || "N/A"],
      ["Note", "Thank you for choosing our hotel!"],
    ];

    tableData.forEach((row, index) => {
      let y = startY + index * lineHeight;

      doc.setFillColor(index % 2 === 0 ? 240 : 255); // Alternate row colors
      doc.rect(20, y, 170, lineHeight, "F");

      doc.setTextColor(0, 0, 0);
      doc.text(row[0], 25, y + 7); // Column 1
      doc.text(row[1], 100, y + 7); // Column 2
    });

    // Save PDF
    doc.save("invoice.pdf");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-lg p-8 mt-12 border border-gray-200 w-3/5">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center gap-2">
        <FaFileInvoice className="text-blue-500" /> Booking Success
      </h1>

      <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
        Invoice Details
      </h2>

      <div className="space-y-4">
        <p className="flex items-center text-gray-600 text-lg">
          <FaBed className="text-blue-500 mr-3" />
          <strong>Room Name:</strong> {invoice?.room_name}
        </p>
        <p className="flex items-center text-gray-600 text-lg">
          <FaDollarSign className="text-green-500 mr-3" />
          <strong>Price:</strong> ${invoice?.price}
        </p>
        <p className="flex items-center text-gray-600 text-lg">
          <FaCalendarCheck className="text-gray-500 mr-3" />
          <strong>Check-in Date:</strong> {invoice?.checkIn}
        </p>
        <p className="flex items-center text-gray-600 text-lg">
          <FaCalendarCheck className="text-gray-500 mr-3" />
          <strong>Check-out Date:</strong> {invoice?.checkOut}
        </p>
      </div>

      <button
        onClick={handleDownloadPDF}
        className="mt-6 w-full bg-blue-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition duration-300"
      >
        <FaDownload /> Download PDF
      </button>
    </div>
  );
};

export default BookingSuccess;
