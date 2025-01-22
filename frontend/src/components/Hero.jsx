import React from "react";
import { Link } from "react-router";

const Hero = () => {
  return (
    <div className="hero-section h-screen flex items-center justify-center relative text-center py-0 px-20">
      <div className="hero-content relative">
        <h1 className="mb-5 text-5xl font-bold">
          Experience Luxury & Comfort Like Never Before
        </h1>
        <p className="text-lg mb-8 max-md:text-base">
          Discover the ultimate in relaxation and hospitality at our exquisite
          hotel. Whether you're traveling for business or leisure, our elegantly
          designed rooms and top-notch amenities will make your stay
          unforgettable. Indulge in the finest comforts and create memories that
          will last a lifetime.
        </p>
        <button
          className="cta-button bg-primary text-white border-none text-base cursor-pointer rounded-md transition-colors duration-300 
        hover:bg-secondary"
        >
          <Link to="/rooms">Book Your Stay Now</Link>
        </button>
      </div>
    </div>
  );
};

export default Hero;
