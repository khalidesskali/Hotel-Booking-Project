import React from "react";
import { Link } from "react-router";

const Hero = () => {
  return (
    <div
      className="hero-section bg-white flex items-center justify-center relative text-center py-0 px-20"
      style={{ height: "75vh" }}
    >
      {/* <div className="hero-content relative">
        <h1 className="mb-5 text-5xl font-bold"></h1>
        <p className="text-lg mb-8 max-md:text-base"></p>
        <button className="cta-button bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition duration-300">
          <Link to="/rooms">Book Your Stay Now</Link>
        </button>
      </div> */}
      <div className="max-w-4xl">
        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full inline-block mb-6">
          New! Record user interviews without recording bots
        </div>
        <h1 className="text-5xl font-semibold text-gray-900 mb-6">
          Experience Luxury & Comfort Like Never Before
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Relax in luxury at our exquisite hotel. Perfect for business or
          leisure, our elegant rooms and premium amenities ensure a memorable
          stay. Experience exceptional comfort and create lasting memories.
        </p>
        <Link
          to="/rooms"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg  hover:bg-blue-700 transition duration-300"
        >
          Book your stay now
        </Link>
      </div>
    </div>
  );
};

export default Hero;
