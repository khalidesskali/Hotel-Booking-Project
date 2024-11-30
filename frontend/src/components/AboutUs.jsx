import React from "react";
import { Link } from "react-router";
import hotel from "../images/hotel.jpg";
import { Button } from "./ui/button";

const AboutUs = ({ title, description }) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="heading mb-20">
          <h2 className="text-3xl font-semibold text-center mb-3">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-center">
            {description}
          </p>
        </div>
        <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16">
          <div className="md:w-1/2  flex flex-col   text-center md:text-left">
            <div className="md:w-1/2 text-center md:text-left  absolute top-1/2 -translate-y-1/2">
              <h3 className="text-4xl  font-bold text-gray-800 mb-5">
                Welcome to{" "}
                <span>
                  Stay<span className="text-primary">H</span>ome
                </span>
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6 w-80">
                Founded with a passion for hospitality, StayHome has been a
                haven for travelers seeking luxury, comfort, and memorable
                experiences. Nestled in the heart of Marrakech, our hotel
                combines timeless elegance with modern amenities.
              </p>
              <Button>
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src={hotel}
              alt="About us visual"
              className="rounded-lg shadow-lg object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
