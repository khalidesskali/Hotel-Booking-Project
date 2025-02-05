import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { PiBathtubLight } from "react-icons/pi";
import { CiCalendar, CiUser } from "react-icons/ci";
import { LiaBedSolid } from "react-icons/lia";
import { IoIosResize } from "react-icons/io";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import the CSS for the skeleton
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuth } from "./AuthProvider";

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

  const isDateDisabled = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Remove time part for accurate comparison
    return date < today;
  };

  // Handle dates conversions
  const formatDate = (date) => {
    const parsedDate = new Date(date);
    return isNaN(parsedDate) ? null : parsedDate.toISOString().split("T")[0]; // Format as 'YYYY-MM-DD'
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
      console.log(response.data);
      alert("The room booked successfully");
      navigate("/payment");
    } catch (e) {
      console.error("An error has occurred", e);
    } finally {
      setLoading2(false);
    }
  };

  const minDate = new Date(startDate);
  minDate.setDate(minDate.getDate() + 1);

  function calculateDateDifference(start, end) {
    const startObj = new Date(start);
    const endObj = new Date(end);

    if (isNaN(startObj) || isNaN(endObj)) return;

    const diff = Math.abs(endObj - startObj);

    const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  const loginClick = () => {
    localStorage.setItem("lastPage", window.location.pathname);
    navigate("/login");
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
              className="flex gap-7 items-start border-2 p-4 rounded-md"
              style={{ borderColor: "#e7e8e7" }}
            >
              <img
                src={room.imageSrc}
                alt={room.roomType}
                className="w-72 object-cover rounded-md mb-4"
              />
              <div className="flex-1">
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
            <div className="lg:col-span-3  rounded-lg">
              <h3 className="text-lg font-bold mb-4">Enter your details</h3>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="Enter your first name"
                    value={userData.fullName}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="number"
                    className={`w-full border rounded-lg px-3 py-2 ${
                      error.phone ? "border-red-600" : "border-gray-300"
                    }`}
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {error.phone && (
                    <p className="text-red-600 text-sm mr-2 mt-1">
                      This field must be filled
                    </p>
                  )}
                </div>
                <div className="col-start-1 col-end-3">
                  <label className="block text-sm font-medium mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="Enter your email address"
                    value={userData.email}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    From *
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startDate && "text-muted-foreground",
                          error.checkIn ? "border-red-600" : "border-input"
                        )}
                      >
                        <CalendarIcon
                          className={error.checkIn ? "text-red-600" : ""}
                        />
                        {startDate ? (
                          format(startDate, "PPP")
                        ) : (
                          <span className={error.checkIn ? "text-red-600" : ""}>
                            Pick a date
                          </span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={(date) => {
                          setStartDate(date);
                          setEndDate("");
                        }}
                        initialFocus
                        disabled={isDateDisabled}
                        fromDate={new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Until *
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !endDate && "text-muted-foreground",
                          error.checkOut ? "border-red-600" : "border-input"
                        )}
                      >
                        <CalendarIcon
                          className={error.checkOut ? "text-red-600" : ""}
                        />
                        {endDate ? (
                          format(endDate, "PPP")
                        ) : (
                          <span
                            className={error.checkOut ? "text-red-600" : ""}
                          >
                            Pick a date
                          </span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                        disabled={isDateDisabled}
                        fromDate={minDate}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </form>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md h-fit">
            <h3 className="text-lg font-bold mb-4">Reservation Summary</h3>
            <div
              className="mb-4 border rounded-md p-4"
              style={{ borderColor: "#e7e8e7" }}
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex flex-col gap-2">
                  <span className="text-gray-600 font-semibold text-sm">
                    Check-in
                  </span>
                  <span className="text-primary font-medium">
                    {startDate instanceof Date
                      ? format(startDate, "PPP")
                      : "--"}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-gray-600 font-semibold text-sm">
                    Check-out
                  </span>
                  <span className="text-primary font-medium">
                    {endDate instanceof Date ? format(endDate, "PPP") : "--"}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1 justify-between">
                <span className="font-semibold text-sm text-gray-500">
                  Total length of stay:
                </span>
                <span className="flex items-center gap-4 font-semibold">
                  {calculateDateDifference(startDate, endDate)}
                  <CiCalendar className="text-[#391ac7] text-base" />
                </span>
              </div>
            </div>
            <div className="flex justify-between text-[#249b6e] font-semibold text-lg mt-4">
              <span>Total Price:</span>
              <span className="font-semibold text-base">
                {startDate && endDate ? `$${data.price.toFixed(2)}` : "--"}
              </span>
            </div>
            {!user ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="mt-6 w-full bg-primary text-white py-2 px-4 rounded-lg">
                    Request To Book
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>You have to login first</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be done. You cannot book a room if you
                      are not logged in.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={loginClick}>
                      Login
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <button
                className="mt-6 w-full bg-primary text-white py-2 px-4 rounded-lg"
                onClick={handleClick}
              >
                {loading2 ? "Request To Book..." : "Request To Book"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Book;
