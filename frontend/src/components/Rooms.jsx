import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { Button } from "./ui/button";
import axios from "axios";
import { useNavigate } from "react-router";

const Rooms = () => {
  const [search, setSearch] = useState("");
  const [roomType, setRoomType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/rooms");
        // console.log(response.data);
        setRooms(response.data.data);
        setLoading(false);
      } catch (e) {
        console.error("error fetching data", e);
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const filteredRooms = rooms.filter((room) =>
    room.roomType.toLowerCase().includes(search.toLowerCase())
  );

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="container mx-auto px-4">
      <div
        className="navigate flex items-center justify-center mb-10"
        style={{ marginTop: "100px" }}
      >
        <div className="search-bar  relative w-fit p-5">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="pl-10 search-input focus:pl-4 mr-4"
          />
          <IoIosSearch className="absolute top-1/2 left-7 -translate-y-1/2 pr-1 border-r border-red w-7 h-7" />
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mr-4 ">
          <label>Room Type</label>
          <select
            className="p-3 cursor-pointer rounded-sm focus:outline-none"
            style={{ border: "1px solid #eee" }}
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="standard">Standard</option>
            <option value="single">Single</option>
            <option value="double">Double</option>
            <option value="suite">Suite</option>
            <option value="family">Family</option>
          </select>
        </div>
        <div className="flex items-center gap-4">
          <div className="start-date flex items-center gap-2">
            <label>Available From</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={today}
            />
          </div>
          <div className="end-date flex gap-2 items-center">
            <label>Available Until</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={today}
            />
          </div>
        </div>
      </div>
      <ul className="rooms grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6  bg-gray-100 p-7 rounded-xl">
        {loading
          ? Array.from({ length: 7 }).map((_, index) => (
              <li key={index} className="bg-white p-2 rounded-xl animate-pulse">
                <div className="bg-gray-300 h-64 rounded-t-xl"></div>
                <div className="info p-3">
                  <div className="h-4 bg-gray-300 w-3/4 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 w-1/2 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 w-1/4 rounded"></div>
                </div>
              </li>
            ))
          : filteredRooms.map((room) => (
              <li key={room.id} className="bg-white p-2 rounded-xl">
                <img
                  src={room.imageSrc}
                  alt={room.roomType}
                  style={{ width: "100%", height: "220px" }}
                  className="rounded-t-xl"
                />
                <div className="details p-3">
                  <h3 className="text-lg font-semibold">{room.roomType}</h3>
                  <p className="text-gray-500 mb-2 h-20">{room.description}</p>
                  <div className="info flex items-center justify-between">
                    <span className="text-gray-500 flex items-center gap-1">
                      Price:
                      <span className="text-primary font-medium">
                        ${room.price.toFixed(2)}
                      </span>
                    </span>
                    <Button onClick={() => navigate(`/rooms/${room.id}`)}>
                      Book
                    </Button>
                  </div>
                </div>
              </li>
            ))}
      </ul>
    </div>
  );
};

export default Rooms;
