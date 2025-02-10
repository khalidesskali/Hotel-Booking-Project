import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { PiBathtubLight } from "react-icons/pi";
import { CiUser } from "react-icons/ci";
import { LiaBedSolid } from "react-icons/lia";
import { IoIosResize } from "react-icons/io";
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

    // Convert dates immediately
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    // Create a new data object to ensure correct values are sent
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
      alert("The room booked successfully");
      const data = response.data;
      navigate(`/review/${data.booking.id}`);
    } catch (e) {
      console.error("An error has occurred", e);
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
            <Skeleton count={3} style={{ margin: "1rem 0" }} />
            <Skeleton height={150} style={{ margin: "2rem 0" }} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton height={50} />
              <Skeleton height={50} />
              <Skeleton height={50} />
              <Skeleton height={50} />
              <Skeleton height={50} />
              <Skeleton height={50} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Skeleton height={300} />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <div
              className="flex md:gap-7 items-start flex-col md:flex-row border-2 p-4 rounded-md"
              style={{ borderColor: "#e7e8e7" }}
            >
              <img
                src={room.imageSrc}
                alt={room.roomType}
                className="w-full object-cover rounded-md mb-4 md:w-72"
              />
              <div className="flex-1 w-full md:w-fit">
                <h2 className="text-xl font-semibold text-primary mt-4 mb-2">
                  {room.roomType}
                </h2>
                <p className="text-gray-600 mb-4">{room.description}</p>
                <div className="flex items-center justify-between gap-7 font-medium text-gray-700 mb-6 text-sm">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-gray-600">Beds</span>
                    <div className="flex gap-2 text-sm">
                      <span>{room.bed}</span>
                      <LiaBedSolid className="text-xl" />
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-gray-600">Area</span>
                    <div className="flex gap-2 text-sm">
                      <span>{room.area}</span>
                      <IoIosResize className="text-xl" />
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-gray-600">Guests</span>
                    <div className="flex gap-2 text-sm">
                      <span>{room.guests}</span>
                      <CiUser className="text-xl" />
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-gray-600">Bathrooms</span>
                    <div className="flex gap-2 text-sm">
                      <span>{room.bathroom}</span>
                      <PiBathtubLight className="text-xl" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-10">
              <h3 className="text-lg font-bold mb-2 mt-10">Good to know:</h3>
              <p>{room.details}</p>
            </div>
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
      )}
    </div>
  );
};

export default Book;
