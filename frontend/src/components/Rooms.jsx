import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";

const Rooms = () => {
  const [search, setSearch] = useState("");
  const [filtredRooms, setFilteredRooms] = useState([]);
  const [roomType, setRoomType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const today = new Date().toISOString().split("T")[0];

  return (
    <div>
      <div className="navigate container mx-auto px-4 flex items-center justify-center">
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
            className="cursor-pointer rounded-sm focus:outline-none"
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
    </div>
  );
};

export default Rooms;
