import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import axios from "axios";

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
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="heading mb-20 ">
          <h2 className="text-3xl font-semibold text-center mb-3">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-center">
            {description}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rooms.slice(0, 6).map((room) => (
            <div
              key={room.id}
              className="bg-white shadow-md p-5 rounded-sm overflow-hidden transition-transform duration-300  hover:shadow-lg"
            >
              <img
                src={room.imageSrc}
                alt={room.roomType}
                className="room-image block mb-4 rounded-md w-full"
              />
              <h3 className="text-xl font-semibold">{room.roomType}</h3>
              <p className=" text-gray-600 text-sm h-10 my-2">
                {room.description}
              </p>
              <span className="block text-primary font-bold text-lg mb-4">
                ${room.price.toFixed(2)}
              </span>
              <Button className="bg-primary text-white py-2 px-4 rounded">
                View Details
              </Button>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center mt-14 w-full">
          <Button>
            <Link to="/rooms">Explore More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRooms;
