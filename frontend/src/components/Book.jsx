import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { FaUserFriends, FaBath } from "react-icons/fa";
import { LiaBedSolid } from "react-icons/lia";
import { MdExposure, MdOutlineSquareFoot } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import the CSS for the skeleton

const Book = () => {
  const [room, setRoom] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.get(
          ` http://localhost:8000/api/rooms/${id}`
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

  const today = new Date().toISOString().split("T")[0];

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
              <div>
                <h2 className="text-xl font-semibold text-primary mt-4 mb-2">
                  {room.roomType}
                </h2>
                <p className="text-gray-600 mb-4">{room.description}</p>
                <div className="flex items-center gap-7 text-gray-700 mb-6 text-sm font-semibold">
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
                      <MdOutlineSquareFoot className="text-xl" />
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-gray-600">Guests</span>
                    <div className="flex gap-2 text-sm">
                      <span>{room.guests}</span>
                      <FaUserFriends className="text-xl" />
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-gray-600">Bathrooms</span>
                    <div className="flex gap-2 text-sm">
                      <span>{room.bathroom}</span>
                      <FaBath className="text-xl" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-10">
              <h3 className="text-lg font-bold mb-2 mt-10">Good to know:</h3>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Dolorum doloremque eos neque officia provident assumenda, quo,
                doloribus saepe optio tempora minima distinctio culpa amet odio
                illo ullam minus, eligendi voluptates?
              </p>
            </div>
            <div className="lg:col-span-3  rounded-lg">
              <h3 className="text-lg font-bold mb-4">Enter your details</h3>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="Enter your last name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="Enter your email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    From *
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={today}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Until *
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={today}
                  />
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
                    Sun, 22 May 2022
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-gray-600 font-semibold text-sm">
                    Check-out
                  </span>
                  <span className="text-primary font-medium">
                    Wed, 25 May 2022
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1 justify-between">
                <span className="font-bold text-sm text-gray-500">
                  Total length of stay:
                </span>
                <span className="flex items-center gap-4 font-semibold">
                  3 <FaCalendarAlt color="blue" />
                </span>
              </div>
            </div>
            <h4 className="text-sm font-bold mb-2">Your price summary</h4>
            <div className="flex justify-between">
              <span className="font-medium">Rooms and offer:</span>
              <span className="font-semibold text-sm text-secondary">
                ${room.price * 3}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">8% VAT:</span>
              <span className="font-semibold text-sm text-secondary">
                ${(room.price * 3 * 0.08).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">City tax:</span>
              <span className="font-semibold text-sm text-secondary">
                $16.44
              </span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-4">
              <span>Total Price:</span>
              <span>
                ${(room.price * 3 + room.price * 3 * 0.08 + 16.44).toFixed(2)}
              </span>
            </div>
            <button className="mt-6 w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary">
              Request To Book
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Book;
