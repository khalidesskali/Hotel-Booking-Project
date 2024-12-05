import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Contact = () => {
  return (
    <div>
      <section className="relative bg-blue-600 text-white py-20 px-4">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{
            backgroundImage: "url('../images/getInTouch.jpg')",
          }}
        ></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-lg">
            We'd love to hear from you! Reach out to us with any questions or
            feedback.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-semibold mb-6">Send Us a Message</h2>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  className="block w-full mt-1 border border-gray-300 rounded-md p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Your Email"
                  className="block w-full mt-1 border border-gray-300 rounded-md p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  placeholder="Your Message"
                  className="block resize-none w-full mt-1 border border-gray-300 rounded-md p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 rounded-md shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500">
                Send Message
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-3xl font-semibold mb-6">Contact Information</h2>
            <p className="mb-6 text-gray-700">
              You can also reach us directly via the following channels:
            </p>
            <ul className="space-y-4 text-gray-600">
              <li>
                <strong>Phone:</strong> +1 234 567 890
              </li>
              <li>
                <strong>Email:</strong> contact@hotel.com
              </li>
              <li>
                <strong>Address:</strong> 123 Hotel St, City, Country
              </li>
            </ul>
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <Link
                  to="#"
                  className="p-3 bg-blue-100 duration-300 rounded-full text-blue-600 hover:bg-blue-200"
                >
                  <FaFacebookF />
                </Link>
                <Link
                  to="#"
                  className="p-3 bg-blue-100 duration-300 rounded-full text-blue-600 hover:bg-blue-200"
                >
                  <FaTwitter />
                </Link>
                <Link
                  to="#"
                  className="p-3 bg-blue-100 duration-300 rounded-full text-blue-600 hover:bg-blue-200"
                >
                  <FaInstagram />
                </Link>
                <Link
                  to="#"
                  className="p-3 bg-blue-100 duration-300 rounded-full text-blue-600 hover:bg-blue-200"
                >
                  <FaLinkedinIn />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-gray-100 p-6 rounded-md shadow-md">
              <h3 className="text-xl font-medium mb-2">
                How can I book a room?
              </h3>
              <p className="text-gray-700">
                You can book a room by visiting our "Rooms" page and selecting
                your preferred option.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-md shadow-md">
              <h3 className="text-xl font-medium mb-2">
                What is your cancellation policy?
              </h3>
              <p className="text-gray-700">
                You can cancel your booking up to 48 hours before check-in
                without any charges.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-md shadow-md">
              <h3 className="text-xl font-medium mb-2">
                How do I contact support?
              </h3>
              <p className="text-gray-700">
                You can contact us via phone, email, or the form on this page
                for any queries.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
