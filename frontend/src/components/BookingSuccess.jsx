import React, { useEffect } from "react";

const BookingSuccess = () => {
  const invoice = {
    roomName: "Deluxe Suite",
    price: "$200",
    checkInDate: "2023-10-01",
    checkOutDate: "2023-10-05",
    additionalNote: "Thank you for choosing our hotel!",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/bookings");
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }

      fetchData();
    };
  }, []);

  const handleDownloadPDF = () => {
    // Logic to download PDF will be added here
    alert("Download PDF functionality to be implemented.");
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-10 p-6">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Booking Success
      </h1>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Invoice</h2>
      <p className="text-gray-600 mb-2">
        <strong>Room Name:</strong> {invoice.roomName}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Price:</strong> {invoice.price}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Check-in Date:</strong> {invoice.checkInDate}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Check-out Date:</strong> {invoice.checkOutDate}
      </p>
      <p className="text-gray-600 mb-4">
        <strong>Note:</strong> {invoice.additionalNote}
      </p>
      <button
        onClick={handleDownloadPDF}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
      >
        Download PDF
      </button>
    </div>
  );
};

export default BookingSuccess;
