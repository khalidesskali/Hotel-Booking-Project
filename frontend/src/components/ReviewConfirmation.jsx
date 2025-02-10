import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import the CSS for the skeleton
import { PiBathtubLight } from "react-icons/pi";
import { CiUser } from "react-icons/ci";
import { LiaBedSolid } from "react-icons/lia";
import { IoIosResize } from "react-icons/io";
import { Button } from "./ui/button";

const ReviewConfirmation = () => {
  const [room, setRoom] = useState("");
  const [book, setBook] = useState("");
  const [status, setStatus] = useState({ status: "" });
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/bookings/${id}/room`
        );
        setRoom(response.data);
        setLoading(false);
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
        setLoading(false);
      } catch (e) {
        console.error("an error has occured", e);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, []);

  useEffect(() => {
    const updateStatus = async () => {
      try {
        const response = await axios.patch(
          `http://localhost:8000/api/bookings/${id}`,
          status
        );
        console.log(response.data);
      } catch (e) {
        console.error("an error has occured", e);
      }
    };

    updateStatus();
  }, [status]);

  const handleConfirmed = () => {
    setStatus({ ...status, status: "confirmed" });
    navigate(`/payment/${id}`);
  };

  const handleCanceled = () => {
    setStatus({ ...status, status: "canceled" });
    navigate("/rooms");
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
        <div className="grid grid-cols-1  justify-center gap-8 ">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <div
              className="flex bg-white md:gap-7 mb-5 items-start flex-col md:flex-row border-2 p-4 rounded-md"
              style={{ borderColor: "#e7e8e7" }}
            >
              <img
                src={room.image}
                alt={room.room_type}
                className="w-full md:w-72 object-cover rounded-md mb-4 "
              />
              <div className="flex-1 w-full md:w-fit">
                <h2 className="text-xl font-semibold text-primary mt-4 mb-2">
                  {room.room_type}
                </h2>
                <p className="text-gray-600 mb-4">{room.description}</p>
                <div className="flex items-center justify-between md:justify-evenly md:gap-7 font-medium text-gray-700 mb-6 text-sm">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-gray-600">Beds</span>
                    <div className="flex gap-2 text-sm">
                      <span>{room.baths}</span>
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
                      <span>{room.bathrooms}</span>
                      <PiBathtubLight className="text-xl" />
                    </div>
                  </div>
                </div>
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
                      {book.checkIn}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-gray-600 font-semibold text-sm">
                      Check-out
                    </span>
                    <span className="text-primary font-medium">
                      {book.checkOut}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-[#249b6e] font-semibold text-lg mt-4 mb-5">
                <span>Total Price:</span>
                <span className="font-semibold text-base">${book.price}</span>
              </div>
              <div className="flex flex-col lg:flex-row items-center gap-4">
                <Button className="w-full lg:w-fit" onClick={handleConfirmed}>
                  Confirm Book
                </Button>
                <Button
                  className="w-full lg:w-fit"
                  onClick={() => navigate(-1)}
                >
                  Update
                </Button>
                <Button className="w-full lg:w-fit" onClick={handleCanceled}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewConfirmation;
