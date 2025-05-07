import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className="custom-hero-section flex items-center justify-center text-center px-20"
      style={{ height: "calc(100vh - 64px)" }}
    >
      <div className="custom-gradient-overlay" />

      {/* Content */}
      <div className="max-w-4xl mb-24 relative z-10">
        <div className="bg-white/20 text-white px-4 py-2 rounded-full inline-block mb-6 backdrop-blur-sm">
          New! Record user interviews without recording bots
        </div>
        <h1 className="text-5xl font-semibold text-white mb-6">
          Experience Luxury & Comfort Like Never Before
        </h1>
        <p className="text-lg text-white/90 mb-8">
          Relax in luxury at our exquisite hotel. Perfect for business or
          leisure, our elegant rooms and premium amenities ensure a memorable
          stay. Experience exceptional comfort and create lasting memories.
        </p>
        <Link
          to="/rooms"
          className="bg-white/20 text-white px-8 py-3 rounded-lg hover:bg-white/30 transition duration-300 backdrop-blur-sm border border-white/20"
        >
          Book your stay now
        </Link>
      </div>
    </div>
  );
};

export default Hero;
