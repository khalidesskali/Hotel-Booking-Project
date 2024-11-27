import React from "react";
import Hero from "./Hero";
import FeaturedRooms from "./FeaturedRooms";
import Amenities from "./Amenities";

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedRooms
        title="Featured Rooms"
        description="Discover our handpicked selection of rooms, offering unmatched comfort
          and luxury to make your stay unforgettable. Choose your perfect
          retreat today!"
      />
      <Amenities
        title="Experience the Best Services We Offer"
        description="From relaxing spas to state-of-the-art gyms, we provide everything you need for a luxurious and comfortable stay."
      />
    </>
  );
};

export default Home;
