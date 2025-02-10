import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Filter = ({ search, setSearch, setGuests }) => {
  return (
    <>
      <h2 className="text-lg font-medium mb-5 mt-4">Find your perfect Stay</h2>
      <div className="search-bar relative w-full mb-5">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="pl-10 search-input w-full focus:pl-4"
        />
        <IoIosSearch className="absolute top-1/2 left-2 -translate-y-1/2 pr-1 border-r border-red w-7 h-7" />
      </div>
      <div>
        <span className="block mb-2 text-sm">guests</span>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select number of guests" />
          </SelectTrigger>
          <SelectContent onChange={(e) => setGuests(e.target.value)}>
            <SelectGroup>
              <SelectLabel></SelectLabel>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <h2 className="text-lg font-medium my-4">Price per night</h2>
      <div className="flex flex-col gap-5">
        <div>
          <input type="checkbox" className="w-8" name="" id="80" />
          <label htmlFor="80">Less than $120</label>
        </div>
        <div>
          <input type="checkbox" className="w-8" name="" id="100" />
          <label htmlFor="100">$120 to $200</label>
        </div>
        <div>
          <input type="checkbox" className="w-8" name="" id="150" />
          <label htmlFor="150">$200 to $250</label>
        </div>
        <div>
          <input type="checkbox" className="w-8" name="" id="200" />
          <label htmlFor="200">More than $250</label>
        </div>
      </div>
    </>
  );
};

export default Filter;
