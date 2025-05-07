import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaStar, FaBed, FaWifi, FaSwimmingPool } from "react-icons/fa";

const FeaturedRooms = ({ title, description }) => {
  const [rooms, setRooms] = useState([]);

  //  Fetching local data with Axios
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/rooms");
        console.log(response.data);
        setRooms(response.data.data);
      } catch (error) {
        console.error("An error has occurred:", error);
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
          {rooms.slice(0, 6).map((room) => (
            <div
              key={room.id}
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 "
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

              <div className="p-6">
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
                    <span className="text-sm text-gray-600">Pool Access</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    <span className="font-medium">4.9</span>
                    <span className="text-gray-500 text-sm">(120 reviews)</span>
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
            className="bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white px-8 py-6 text-lg font-medium transition-all duration-300"
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
