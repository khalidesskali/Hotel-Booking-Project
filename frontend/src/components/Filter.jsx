import React from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { FaSearch } from "react-icons/fa";

const Filter = ({ search, setSearch, priceRange, setPriceRange }) => {
  const handlePriceChange = (value) => {
    if (priceRange === value) {
      // If clicking the same radio button, clear the selection
      setPriceRange("");
    } else {
      setPriceRange(value);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Filters</h2>
        <div className="space-y-4">
          {/* Search Input */}
          <div className="space-y-2">
            <Label
              htmlFor="search"
              className="text-sm font-medium text-gray-700"
            >
              Search Rooms
            </Label>
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                id="search"
                type="text"
                placeholder="Search by room type..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-200 focus:border-primary focus:ring-primary"
              />
            </div>
          </div>

          {/* Price Range Radio Buttons */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-gray-700">
                Price Range
              </Label>
              {priceRange && (
                <button
                  onClick={() => setPriceRange("")}
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-gray-600 hover:text-primary cursor-pointer group">
                <input
                  type="radio"
                  name="price"
                  value="0-120"
                  checked={priceRange === "0-120"}
                  onChange={() => handlePriceChange("0-120")}
                  className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                />
                <span className="group-hover:text-primary transition-colors">
                  Less than $120
                </span>
              </label>
              <label className="flex items-center gap-2 text-gray-600 hover:text-primary cursor-pointer group">
                <input
                  type="radio"
                  name="price"
                  value="120-200"
                  checked={priceRange === "120-200"}
                  onChange={() => handlePriceChange("120-200")}
                  className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                />
                <span className="group-hover:text-primary transition-colors">
                  $120 to $200
                </span>
              </label>
              <label className="flex items-center gap-2 text-gray-600 hover:text-primary cursor-pointer group">
                <input
                  type="radio"
                  name="price"
                  value="200-250"
                  checked={priceRange === "200-250"}
                  onChange={() => handlePriceChange("200-250")}
                  className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                />
                <span className="group-hover:text-primary transition-colors">
                  $200 to $250
                </span>
              </label>
              <label className="flex items-center gap-2 text-gray-600 hover:text-primary cursor-pointer group">
                <input
                  type="radio"
                  name="price"
                  value="250"
                  checked={priceRange === "250"}
                  onChange={() => handlePriceChange("250")}
                  className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                />
                <span className="group-hover:text-primary transition-colors">
                  More than $250
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
