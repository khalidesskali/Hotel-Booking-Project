import React from "react";
import Hero from "./Hero";
import FeaturedRooms from "./FeaturedRooms";
import Amenities from "./Amenities";
import AboutUs from "./AboutUs";
import CTA from "./CTA";
import WhyChooseUs from "./WhyChooseUs";
import ContactSection from "./ContactSection";

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
      <AboutUs
        title="Your Home Away From Home"
        description="At StayHome, we strive to create an experience that feels as comforting as home but with the indulgence of a getaway. Relax, rejuvenate, and relish every moment with us."
      />
      <CTA />
      <WhyChooseUs
        title="Why Stay With Us?"
        description="We offer the best experiences to make your stay unforgettable."
      />
      <ContactSection
        title="Get in Touch"
        description=" We’d love to hear from you! Feel free to reach out for inquiries or
            more information."
      />
    </>
  );
};

export default Home;
