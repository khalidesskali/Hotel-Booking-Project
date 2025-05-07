import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { PiBathtubLight } from "react-icons/pi";
import { CiUser } from "react-icons/ci";
import { LiaBedSolid } from "react-icons/lia";
import { IoIosResize } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import the CSS for the skeleton
import { format } from "date-fns";
import { useAuth } from "./AuthProvider";
import ReservationDetails from "./ReservationDetails";
import ReservationSummary from "./ReservationSummary";

function calculateDateDifference(start, end) {
  const startObj = new Date(start);
  const endObj = new Date(end);

  if (isNaN(startObj) || isNaN(endObj)) return;

  const diff = Math.abs(endObj - startObj);

  const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return diffDays;
}

const Book = () => {
  const { user } = useAuth();
  const { id } = useParams();

  const [room, setRoom] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState({
    phone: false,
    checkIn: false,
    checkOut: false,
  });
  const [showSuccess, setShowSuccess] = useState(false);

  // Fetch signle room data
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/rooms/${id}`
        );
        setRoom(response.data);
        setLoading(false);
      } catch (e) {
        console.error("An error has occurred", e);
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  const navigate = useNavigate();

  const [userData, setUserData] = useState([]);
  // Fetch the data of the current user (if loggined)
  useEffect(() => {
    const fetchUser = async () => {
      if (user) {
        try {
          const res = await axios.get(
            `http://localhost:8000/api/users/${user.id}`
          );
          setUserData(res.data);
        } catch (e) {
          console.error("An error has occured", e);
        }
      }
    };

    fetchUser();
  }, [user]);

  // Handle dates conversions
  const formatDate = (date) => {
    if (!date) return null;

    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) return null;

    return parsedDate.toLocaleDateString("fr-CA"); // 'YYYY-MM-DD' format
  };

  // Intial the data object
  const [data, setData] = useState({
    user_id: user ? Number(user.id) : null,
    room_id: Number(id),
    check_in: formatDate(startDate),
    check_out: formatDate(endDate),
    price: 0,
  });

  useEffect(() => {
    // Ensure room is not null or undefined before accessing room.price
    if (room && room.price) {
      setData((prevData) => ({
        ...prevData,
        price: parseFloat(
          (calculateDateDifference(startDate, endDate) * room.price).toFixed(2)
        ),
      }));
    }
  }, [room, startDate, endDate]);

  const handleClick = async () => {
    let newError = { ...error };

    if (!phone) newError.phone = true;
    else newError.phone = false;

    if (!startDate) newError.checkIn = true;
    else newError.checkIn = false;

    if (!endDate) newError.checkOut = true;
    else newError.checkOut = false;

    setError(newError);

    if (!phone || !startDate || !endDate) return;

    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    const payload = {
      ...data,
      check_in: formattedStartDate,
      check_out: formattedEndDate,
    };

    setLoading2(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/bookings",
        payload
      );
      setShowSuccess(true);
      // Wait for 2 seconds to show the success message before redirecting
      setTimeout(() => {
        const data = response.data;
        navigate(`/review/${data.booking.id}`);
      }, 2000);
    } catch (e) {
      console.error("An error has occurred", e);
    } finally {
      setLoading2(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Success Toast */}
        {showSuccess && (
          <div className="fixed top-4 right-4 z-50 animate-slide-in">
            <div className="bg-green-50 border border-green-200 rounded-lg shadow-lg p-4 flex items-center gap-3">
              <FaCheckCircle className="text-green-500 text-xl" />
              <div>
                <h4 className="font-semibold text-green-800">
                  Booking Successful!
                </h4>
                <p className="text-green-600 text-sm">
                  Redirecting to review page...
                </p>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg">
              <Skeleton height={300} className="rounded-xl mb-6" />
              <Skeleton count={3} className="mb-4" />
              <Skeleton height={200} className="rounded-xl mb-8" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Skeleton height={60} className="rounded-lg" />
                <Skeleton height={60} className="rounded-lg" />
                <Skeleton height={60} className="rounded-lg" />
                <Skeleton height={60} className="rounded-lg" />
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <Skeleton height={400} className="rounded-xl" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Room Details Card */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex md:gap-8 items-start flex-col md:flex-row">
                  <div className="relative w-full md:w-80">
                    <img
                      src={room.imageSrc}
                      alt={room.roomType}
                      className="w-full h-64 object-cover rounded-xl shadow-md"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-primary font-semibold shadow-sm">
                      ${room.price}/night
                    </div>
                  </div>
                  <div className="flex-1 mt-6 md:mt-0">
                    <h2 className="text-2xl font-bold text-primary mb-3">
                      {room.roomType}
                    </h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {room.description}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl">
                        <span className="text-gray-600 text-sm mb-2">Beds</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{room.bed}</span>
                          <LiaBedSolid className="text-xl text-primary" />
                        </div>
                      </div>
                      <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl">
                        <span className="text-gray-600 text-sm mb-2">Area</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{room.area}</span>
                          <IoIosResize className="text-xl text-primary" />
                        </div>
                      </div>
                      <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl">
                        <span className="text-gray-600 text-sm mb-2">
                          Guests
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{room.guests}</span>
                          <CiUser className="text-xl text-primary" />
                        </div>
                      </div>
                      <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl">
                        <span className="text-gray-600 text-sm mb-2">
                          Bathrooms
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{room.bathroom}</span>
                          <PiBathtubLight className="text-xl text-primary" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Room Details Section */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Good to know
                </h3>
                <p className="text-gray-600 leading-relaxed">{room.details}</p>
              </div>

              {/* Reservation Details */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <ReservationDetails
                  userData={userData}
                  error={error}
                  startDate={startDate}
                  setStartDate={setStartDate}
                  endDate={endDate}
                  setEndDate={setEndDate}
                  phone={phone}
                  setPhone={setPhone}
                  format={format}
                />
              </div>
            </div>

            {/* Reservation Summary */}
            <div className="lg:sticky lg:top-8">
              <ReservationSummary
                startDate={startDate}
                endDate={endDate}
                handleClick={handleClick}
                loading2={loading2}
                calculateDateDifference={calculateDateDifference}
                format={format}
                data={data}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Book;
