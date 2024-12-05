import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-white py-10" style={{ backgroundColor: "#191919" }}>
      <div className="container mx-auto grid grid-cols-1 max-md:place-items-center max-md:text-center sm:grid-cols-3 gap-8">
        {/* Logo and About */}
        <div>
          <span className="block mb-7 font-semibold text-3xl">
            Stay<span className="text-primary">H</span>ome
          </span>
          <p className="text-gray-400 max-w-80">
            Experience luxury and comfort with us. Book your stay today and
            create unforgettable memories.
          </p>
          <div className="flex justify-center md:justify-start space-x-4 mt-4">
            <Link className="p-2 lg:p-4 duration-300 rounded-sm hover:bg-blue-500 hover:text-white ">
              <FaFacebookF size={20} />
            </Link>
            <Link className="p-2 lg:p-4 duration-300 rounded-sm hover:bg-blue-400 hover:text-white ">
              <FaTwitter size={20} />
            </Link>
            <Link className="p-2 lg:p-4 duration-300 rounded-sm hover:bg-pink-500 hover:text-white ">
              <FaInstagram size={20} />
            </Link>
            <Link className="p-2 lg:p-4 duration-300 rounded-sm hover:bg-blue-600 hover:text-white ">
              <FaLinkedinIn size={20} />
            </Link>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/rooms"
                className="text-gray-300 hover:text-blue-400 hover:ml-2 duration-300"
              >
                Rooms
              </Link>
            </li>
            <li>
              <Link
                to="/facilities"
                className="text-gray-300 hover:text-blue-400 hover:ml-2 duration-300"
              >
                Facilities
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-gray-300 hover:text-blue-400 hover:ml-2 duration-300"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-gray-300 hover:text-blue-400 hover:ml-2 duration-300"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <p className="text-gray-400 mb-3">
            <span className="font-semibold">Email:</span> contact@hotel.com
          </p>
          <p className="text-gray-400 mb-3">
            <span className="font-semibold">Phone:</span> +123 456 7890
          </p>
          <p className="text-gray-400">
            <span className="font-semibold">Address:</span> 123 Hotel St, City,
            Country
          </p>
        </div>
      </div>
      {/* Bottom footer */}
      <div
        className="text-center text-gray-100 mt-4 pt-4 border-t"
        style={{ borderColor: "#444" }}
      >
        <p>&copy; 2024 StayHome. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
