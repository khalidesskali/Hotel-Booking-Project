import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";

const FeaturedRooms = ({ title, description }) => {
  const [rooms, setRooms] = useState([]);

  //   Fetching local data
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("/rooms.json");

        if (!response.ok) {
          throw new Error("Fetching rooms data failed");
        }

        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error("An error has occurred:", error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="heading mb-20 max-md:text-center">
          <h2 className="text-3xl font-semibold text-center mb-3">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto ">{description}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rooms.slice(0, 6).map((room) => (
            <div
              key={room.id}
              className="bg-white shadow-md p-5 rounded-lg overflow-hidden  transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            >
              <img
                src={room.image}
                alt={room.name}
                className="room-image block mb-4 rounded-md w-full h-"
              />
              <h3 className="text-xl font-semibold">{room.name}</h3>
              <p className=" text-gray-600 text-sm my-2">{room.description}</p>
              <span className="block text-primary font-bold text-lg mb-4">
                ${room.price.toFixed(2)}
              </span>
              <Button className="bg-primary text-white py-2 px-4 rounded">
                View Details
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRooms;
