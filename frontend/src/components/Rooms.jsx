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
import { FaStar, FaBed, FaWifi, FaSwimmingPool } from "react-icons/fa";
import { motion } from "framer-motion";
import RoomCardSkeleton from "./RoomCardSkeleton";

const Rooms = () => {
  const [search, setSearch] = useState("");
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8000/api/rooms");
        setRooms(response.data.data);
      } catch (e) {
        console.error("error fetching data", e);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  // Filter rooms based on search and price range
  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.roomType
      .toLowerCase()
      .includes(search.toLowerCase());

    // Price range filtering
    let matchesPrice = true;
    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number);
      if (priceRange === "250") {
        matchesPrice = room.price >= 250;
      } else if (max) {
        matchesPrice = room.price >= min && room.price <= max;
      }
    }

    return matchesSearch && matchesPrice;
  });

  // Sort rooms based on selected option
  const sortedRooms = [...filteredRooms].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Discover Our Rooms
          </h1>
          <p className="text-gray-600">
            Find your perfect stay from our selection of luxury accommodations
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <Filter
                search={search}
                setSearch={setSearch}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Sort Bar */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Select onValueChange={setSortBy} value={sortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort By Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="price-asc">Low to High</SelectItem>
                    <SelectItem value="price-desc">High to Low</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Rooms Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {loading
                ? // Show skeleton loaders while loading
                  Array.from({ length: 6 }).map((_, index) => (
                    <RoomCardSkeleton key={index} />
                  ))
                : // Show actual room cards when data is loaded
                  sortedRooms.map((room, index) => (
                    <motion.div
                      key={room.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg 
                      transition-shadow duration-300"
                    >
                      <div className="relative">
                        <img
                          src={room.imageSrc}
                          alt={room.roomType}
                          className="w-full h-64 object-cover"
                        />
                        <div
                          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3
                         py-1 rounded-full text-primary font-semibold"
                        >
                          ${room.price.toFixed(2)}/night
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">
                          {room.roomType}
                        </h3>
                        <div className="h-[48px] mb-4">
                          <p className="text-gray-600 line-clamp-2">
                            {room.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-1">
                            <FaBed className="text-primary" />
                            <span className="text-sm text-gray-600">
                              King Bed
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FaWifi className="text-primary" />
                            <span className="text-sm text-gray-600">
                              Free WiFi
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FaSwimmingPool className="text-primary" />
                            <span className="text-sm text-gray-600">
                              Pool Access
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-1">
                            <FaStar className="text-yellow-400" />
                            <span className="font-medium">4.9</span>
                            <span className="text-gray-500 text-sm">
                              (120 reviews)
                            </span>
                          </div>
                          <Button
                            onClick={() => navigate(`/rooms/${room.id}`)}
                            className="bg-primary hover:bg-primary/90 text-white px-6 py-2 
                            rounded-lg transition-colors duration-300"
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
