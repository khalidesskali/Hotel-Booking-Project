import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useNavigate } from "react-router";
import Filter from "./Filter";

const Rooms = () => {
  const [search, setSearch] = useState("");
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [guests, setGuests] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/rooms");
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

  return (
    <div className="flex lg:justify-center flex-col lg:flex-row h-screen">
      <div className="lg:flex-1 bg-[#f1f1f1] h-fit lg:h-full p-5">
        <Filter search={search} setSearch={setSearch} setGuests={setGuests} />
      </div>
      <div className=" lg:flex-[4] p-5">
        <div className="mb-5">
          <span className="block mb-4 text-gray-500 text-sm">
            showing results for
          </span>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="apple">Price</SelectItem>
                <SelectItem value="banana">Guests</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <ul className="rooms grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 absolute left-0 lg:relative gap-5 bg-gray-100 p-7 rounded-xl">
          {/* {loading
            ? Array.from({ length: 20 }).map((_, index) => (
                <li
                  key={index}
                  className="bg-white p-2 rounded-xl animate-pulse"
                >
                  <div className="bg-gray-300 h-64 rounded-t-xl"></div>
                  <div className="info p-3">
                    <div className="h-4 bg-gray-300 w-3/4 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 w-1/2 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 w-1/4 rounded"></div>
                  </div>
                </li>
              ))
            :
              ))} */}
          {filteredRooms.map((room) => {
            return (
              <li
                key={room.id}
                className="flex flex-col lg:flex-row bg-white p-2 rounded-xl"
              >
                <img
                  src={room.imageSrc}
                  alt={room.roomType}
                  className="rounded-sm w-full h-[300px] lg:h-60 lg:w-96"
                />
                <div className="details p-5">
                  <h3 className="text-2xl font-semibold">{room.roomType}</h3>
                  <p className="text-gray-500 mb-2 text-lg">
                    {room.description}
                  </p>
                </div>
                <div className="info flex items-starat lg:items-end justify-end flex-col gap-3 ml-5 flex-1 lg:mr-5">
                  <span className="text-gray-500 flex items-center gap-1">
                    <span className="text-primary font-medium">
                      ${room.price.toFixed(2)}{" "}
                      <span className="text-xs">/per night</span>
                    </span>
                  </span>
                  <Button
                    className="mb-4 w-full lg:w-fit block"
                    onClick={() => navigate(`/rooms/${room.id}`)}
                  >
                    View options
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* <div
        className="navigate flex items-center justify-center mb-10"
        style={{ marginTop: "100px" }}
      >
        
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
      </div> */}
    </div>
  );
};

export default Rooms;
