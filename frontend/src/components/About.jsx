import React from "react";
import {
  FaBed,
  FaHotel,
  FaMoneyBillAlt,
  FaPhoneAlt,
  FaUsers,
} from "react-icons/fa";
import Footer from "./Footer";

const About = () => {
  return (
    <div className="bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="w-full py-20 px-4 text-center bg-primary text-white">
        <h1 className="text-5xl font-extrabold mb-6">About Us</h1>
        <p className="text-xl max-w-2xl mx-auto mb-4">
          Your perfect stay is just a click away. We connect travelers with
          top-rated accommodations across the world.
        </p>
      </section>

      {/* Our Story Section */}
      <section className="w-full py-16 px-8 text-center">
        <h2 className="text-4xl font-semibold text-blue-900 mb-6">
          Our Story: Making Every Stay a Memorable Experience
        </h2>
        <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
          Our journey began with a simple goal: to make hotel booking easy,
          affordable, and hassle-free. We've grown into a trusted platform with
          thousands of satisfied customers, delivering comfort and convenience
          with every stay.
        </p>
      </section>
      {/* Our Services Section */}
      <section className="w-full py-16 px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-semibold text-blue-900 mb-6">
            What We Offer
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Our platform offers a wide range of services to meet your needs,
            whether you're planning a family vacation, business trip, or
            romantic getaway.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="p-6 bg-white rounded-lg shadow-xl hover:shadow-2xl transition duration-300">
              <div className="text-4xl flex justify-center flex justify-center text-blue-600 mb-4">
                <FaBed />
              </div>
              <h3 className="text-2xl font-semibold text-blue-900 mb-4">
                Comfortable Stays
              </h3>
              <p className="text-gray-700">
                Choose from a wide variety of hotels, ranging from budget
                options to luxurious resorts.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-xl hover:shadow-2xl transition duration-300">
              <div className="text-4xl flex justify-center text-blue-600 mb-4">
                <FaHotel />
              </div>
              <h3 className="text-2xl font-semibold text-blue-900 mb-4">
                Top-Rated Hotels
              </h3>
              <p className="text-gray-700">
                We partner with the best hotels globally, ensuring your stay is
                of the highest quality.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-xl hover:shadow-2xl transition duration-300">
              <div className="text-4xl flex justify-center text-blue-600 mb-4">
                <FaMoneyBillAlt />
              </div>
              <h3 className="text-2xl font-semibold text-blue-900 mb-4">
                Best Price Guarantee
              </h3>
              <p className="text-gray-700">
                Our platform guarantees the best prices available, so you don’t
                have to search elsewhere.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-xl hover:shadow-2xl transition duration-300">
              <div className="text-4xl flex justify-center text-blue-600 mb-4">
                <FaUsers />
              </div>
              <h3 className="text-2xl font-semibold text-blue-900 mb-4">
                Family & Group Stays
              </h3>
              <p className="text-gray-700">
                Find accommodations that are perfect for families or large
                groups, with all the amenities you need.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-xl hover:shadow-2xl transition duration-300">
              <div className="text-4xl flex justify-center text-blue-600 mb-4">
                <FaPhoneAlt />
              </div>
              <h3 className="text-2xl font-semibold text-blue-900 mb-4">
                24/7 Customer Support
              </h3>
              <p className="text-gray-700">
                Our dedicated support team is always available to help you with
                any booking or accommodation inquiries.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="w-full py-16 px-8 text-center bg-gradient-to-r from-blue-600 to-blue-900">
        <h2 className="text-4xl font-semibold text-white mb-6">
          Ready to Book Your Stay?
        </h2>
        <p className="text-lg text-white mb-6">
          Explore our selection of hotels and get ready for an unforgettable
          experience. Your perfect vacation is just a click away.
        </p>
        <button className="px-8 py-3 text-white bg-primary rounded-full hover:bg-secondary transition duration-300">
          Start Booking
        </button>
      </section>
    </div>
  );
};

export default About;
