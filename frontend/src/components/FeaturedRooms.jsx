import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaStar, FaBed, FaWifi, FaSwimmingPool } from "react-icons/fa";

const RoomCardSkeleton = () => {
  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-lg">
      <div className="relative overflow-hidden">
        <div className="w-full h-64 bg-gray-200 animate-pulse" />
      </div>
      <div className="p-6 max-h-[240px] h-full flex flex-col justify-evenly">
        <div className="h-8 bg-gray-200 rounded animate-pulse mb-3" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
        </div>
        <div className="flex items-center gap-4 my-4">
          <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
          <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
          <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};

const FeaturedRooms = ({ title, description }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://127.0.0.1:8000/api/rooms");
        setRooms(response.data.data);
      } catch (error) {
        console.error("An error has occurred:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="heading mb-16">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
            {title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-center text-lg">
            {description}
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {loading
            ? // Show skeleton loaders while loading
              Array.from({ length: 6 }).map((_, index) => (
                <RoomCardSkeleton key={index} />
              ))
            : // Show actual room cards when data is loaded
              rooms.slice(0, 6).map((room) => (
                <div
                  key={room.id}
                  className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={room.imageSrc}
                      alt={room.roomType}
                      className="room-image w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-primary font-semibold">
                      ${room.price.toFixed(2)}/night
                    </div>
                  </div>

                  <div className="p-6 max-h-[240px] h-full flex flex-col justify-evenly">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">
                      {room.roomType}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {room.description}
                    </p>

                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center gap-1">
                        <FaBed className="text-primary" />
                        <span className="text-sm text-gray-600">King Bed</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaWifi className="text-primary" />
                        <span className="text-sm text-gray-600">Free WiFi</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaSwimmingPool className="text-primary" />
                        <span className="text-sm text-gray-600">
                          Pool Access
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-400" />
                        <span className="font-medium">4.9</span>
                        <span className="text-gray-500 text-sm">
                          (120 reviews)
                        </span>
                      </div>
                      <Button
                        asChild
                        className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg transition-colors duration-300"
                      >
                        <Link to={`/rooms/${room.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        <div className="flex items-center justify-center mt-16">
          <Button
            asChild
            className="text-primary border-2 border-primary px-8 py-6 text-lg font-medium transition-all duration-300"
          >
            <Link to="/rooms" className="flex items-center gap-2">
              Explore More Rooms
              <FaStar className="text-yellow-400" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRooms;
