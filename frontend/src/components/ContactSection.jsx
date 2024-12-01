import { FaEnvelope, FaPhoneAlt, FaLocationArrow } from "react-icons/fa";
import { Button } from "./ui/button";

const ContactUs = ({ title, description }) => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="mb-10 md:mb-20">
          <h2 className="text-3xl font-semibold text-center mb-3">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-center">
            {description}
          </p>
        </div>
        <div className="flex justify-center gap-10 md:gap-60 flex-wrap">
          <div className="flex flex-col justify-center gap-12 mt-10">
            <div className="flex items-center space-x-4 ">
              <FaEnvelope size={30} className="text-blue-600" />
              <div>
                <p className="text-lg font-medium">Email</p>
                <p className="text-gray-600">contact@hotel.com</p>
              </div>
            </div>
            <div className="flex items-center  space-x-4">
              <FaPhoneAlt size={30} className="text-blue-600" />
              <div>
                <p className="text-lg font-medium">Phone</p>
                <p className="text-gray-600">+123 456 7890</p>
              </div>
            </div>
            <div className="flex items-center  space-x-4">
              <FaLocationArrow size={30} className="text-blue-600" />
              <div>
                <p className="text-lg font-medium">Address</p>
                <p className="text-gray-600">123 Hotel St, City, Country</p>
              </div>
            </div>
          </div>
          <form
            className="bg-white p-8 shadow-xl rounded-lg max-md:-order-1"
            style={{ width: "450px" }}
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter your full name"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter your email address"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-gray-700 font-medium mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                className="w-full p-3 h-32 border border-gray-300 rounded-lg resize-none duration-300 focus:border-primary focus:outline-none"
                rows="4"
                placeholder="Your message"
              ></textarea>
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
