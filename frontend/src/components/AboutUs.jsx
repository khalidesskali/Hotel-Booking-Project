import React from "react";
import { Link } from "react-router";
import hotel from "../images/hotel.jpg";
import { Button } from "./ui/button";
import { FaHotel, FaStar, FaUsers, FaAward } from "react-icons/fa";

const AboutUs = ({ title, description }) => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {title}
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">{description}</p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="relative order-2 md:order-1">
            <div className="relative rounded-2xl overflow-hidden group">
              <img
                src={hotel}
                alt="About us visual"
                className="w-full h-[400px] md:h-[500px] object-cover transition-transform
                 duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent
               opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -z-10 -bottom-4 -left-4 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
            <div className="absolute -z-10 -top-4 -right-4 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
          </div>

          {/* Content Section */}
          <div className="order-1 md:order-2">
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  Welcome to{" "}
                  <span className="relative inline-block">
                    Stay<span className="text-primary">H</span>ome
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary/20"></span>
                  </span>
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Founded with a passion for hospitality, StayHome has been a
                  haven for travelers seeking luxury, comfort, and memorable
                  experiences. Nestled in the heart of Marrakech, our hotel
                  combines timeless elegance with modern amenities.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FaHotel className="text-xl text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-800">200+</p>
                      <p className="text-sm text-gray-600">Luxury Rooms</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FaUsers className="text-xl text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-800">50k+</p>
                      <p className="text-sm text-gray-600">Happy Guests</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FaAward className="text-xl text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-800">15+</p>
                      <p className="text-sm text-gray-600">Years Experience</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FaStar className="text-xl text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-800">4.9</p>
                      <p className="text-sm text-gray-600">Guest Rating</p>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                asChild
                className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white px-8 py-6 
                text-lg font-medium transition-all duration-300"
              >
                <Link
                  to="/about"
                  className="flex items-center justify-center gap-2"
                >
                  Learn More About Us
                  <span className="text-xl">→</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
