import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import the CSS for the skeleton
import { PiBathtubLight } from "react-icons/pi";
import { CiUser, CiCalendar } from "react-icons/ci";
import { LiaBedSolid } from "react-icons/lia";
import { IoIosResize } from "react-icons/io";
import { motion } from "framer-motion";
import { FaHotel, FaCheckCircle, FaTimes } from "react-icons/fa";

const ReviewConfirmation = () => {
  const [room, setRoom] = useState("");
  const [book, setBook] = useState("");
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoom = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/bookings/${id}/room`
        );
        setRoom(response.data);
      } catch (e) {
        console.error("an error has occured", e);
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, []);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/bookings/${id}`
        );
        setBook(response.data);
      } catch (e) {
        console.error("an error has occured", e);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, []);

  const handleConfirmed = async () => {
    setLoading2(true);
    try {
      await axios.patch(`http://localhost:8000/api/bookings/${id}`, {
        status: "confirmed",
      });
      navigate(`/payment/${id}`);
    } catch (e) {
      console.error("an error has occured", e);
    } finally {
      setLoading3(false);
    }
  };

  const handleCanceled = async () => {
    setLoading3(true);
    try {
      await axios.patch(`http://localhost:8000/api/bookings/${id}`, {
        status: "confirmed",
      });
      navigate("/rooms");
    } catch (e) {
      console.error("an error has occured", e);
    } finally {
      setLoading2(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <Skeleton height={200} />
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 justify-center gap-8"
        >
          <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex bg-white md:gap-8 mb-8 items-start flex-col md:flex-row border border-gray-100 p-6 rounded-xl shadow-sm">
              <div className="relative w-full md:w-80 h-64 md:h-72">
                <img
                  src={room.image}
                  alt={room.room_type}
                  className="w-full h-full object-cover rounded-xl shadow-sm"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl" />
              </div>
              <div className="flex-1 w-full md:w-fit mt-6 md:mt-0">
                <h2 className="text-2xl font-bold text-primary mb-3">
                  {room.room_type}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {room.description}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 text-sm font-medium">
                      Beds
                    </span>
                    <div className="flex items-center gap-2 text-primary">
                      <span className="font-semibold">{room.baths}</span>
                      <LiaBedSolid className="text-xl" />
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 text-sm font-medium">
                      Area
                    </span>
                    <div className="flex items-center gap-2 text-primary">
                      <span className="font-semibold">{room.area}</span>
                      <IoIosResize className="text-xl" />
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 text-sm font-medium">
                      Guests
                    </span>
                    <div className="flex items-center gap-2 text-primary">
                      <span className="font-semibold">{room.guests}</span>
                      <CiUser className="text-xl" />
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 text-sm font-medium">
                      Bathrooms
                    </span>
                    <div className="flex items-center gap-2 text-primary">
                      <span className="font-semibold">{room.bathrooms}</span>
                      <PiBathtubLight className="text-xl" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FaHotel className="text-primary text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  Reservation Summary
                </h3>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex flex-col gap-2">
                    <span className="text-gray-600 font-medium text-sm">
                      Check-in
                    </span>
                    <div className="flex items-center gap-2">
                      <CiCalendar className="text-primary text-xl" />
                      <span className="text-primary font-semibold text-lg">
                        {book.checkIn}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-gray-600 font-medium text-sm">
                      Check-out
                    </span>
                    <div className="flex items-center gap-2">
                      <CiCalendar className="text-primary text-xl" />
                      <span className="text-primary font-semibold text-lg">
                        {book.checkOut}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-6 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/10 mb-8">
                <span className="font-semibold text-primary text-lg">
                  Total Price
                </span>
                <span className="font-bold text-primary text-2xl">
                  ${book.price}
                </span>
              </div>

              <div className="flex flex-col lg:flex-row items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full lg:w-auto bg-primary text-white py-3 px-6 rounded-xl font-semibold
                    hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg
                    flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  onClick={handleConfirmed}
                  disabled={loading2}
                >
                  {loading2 ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Confirming...
                    </>
                  ) : (
                    <>
                      <FaCheckCircle className="text-lg" />
                      Confirm Booking
                    </>
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full lg:w-auto bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold
                    hover:bg-gray-200 transition-all duration-300 shadow-md hover:shadow-lg
                    flex items-center justify-center gap-2"
                  onClick={() => navigate(-1)}
                >
                  Update Details
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full lg:w-auto bg-red-50 text-red-600 py-3 px-6 rounded-xl font-semibold
                    hover:bg-red-100 transition-all duration-300 shadow-md hover:shadow-lg
                    flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  onClick={handleCanceled}
                  disabled={loading3}
                >
                  {loading3 ? (
                    <>
                      <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                      Cancelling...
                    </>
                  ) : (
                    <>
                      <FaTimes className="text-lg" />
                      Cancel Booking
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ReviewConfirmation;
