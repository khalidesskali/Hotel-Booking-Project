import React from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";
import { FaArrowRight } from "react-icons/fa";

const CTA = () => {
  const location = useNavigate();

  return (
    <section className="relative bg-gray-900">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Book Your Dream Stay Today
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Experience luxury and comfort with our exclusive deals
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => location("/rooms")}
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg font-medium transition-all duration-300 group"
            >
              Explore Rooms
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => location("/facilities")}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white px-8 py-3 text-lg font-medium transition-all duration-300"
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
