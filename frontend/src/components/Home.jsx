import React from "react";
import Hero from "./Hero";
import FeaturedRooms from "./FeaturedRooms";

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
    </>
  );
};

export default Home;
