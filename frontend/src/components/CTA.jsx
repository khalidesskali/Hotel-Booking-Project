import React from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";

const CTA = () => {
  const location = useNavigate();

  return (
    <section className="cta relative bg-cover bg-center">
      <div className="bg-black/50 text-white py-16 px-8 text-center">
        <h2 className="text-4xl font-bold mb-4">Book Your Dream Stay Today!</h2>
        <p className="text-lg mb-6">
          Enjoy exclusive deals and unforgettable experiences.
        </p>
        <div className="space-x-4">
          <Button onClick={() => location("/rooms")}>Explore Rooms</Button>
          <Button
            onClick={() => location("/facilities")}
            className="bg-white text-black hover:bg-gray-200 transition-colors duration-300"
          >
            Book Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
