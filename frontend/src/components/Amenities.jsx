import React from "react";
import {
  FaSwimmer,
  FaSpa,
  FaUtensils,
  FaDumbbell,
  FaCar,
  FaPaw,
} from "react-icons/fa";

const Amenities = ({ title, description }) => {
  const amenities = [
    {
      id: 1,
      icon: <FaSwimmer />,
      title: "Swimming Pool",
      description:
        "Dive into our crystal-clear heated pool, perfect for a refreshing swim or a relaxing lounge by the poolside with your favorite beverage. Designed for both adults and kids, it's the ideal spot for some family fun.",
    },
    {
      id: 2,
      icon: <FaSpa />,
      title: "Luxury Spa",
      description:
        "Indulge in tranquility with our world-class spa treatments, including massages, facials, and holistic therapies. Let our expert therapists help you unwind and revitalize your mind, body, and soul.",
    },
    {
      id: 3,
      icon: <FaUtensils />,
      title: "Fine Dining",
      description:
        "Experience a culinary journey with our gourmet dining options. From locally sourced ingredients to international flavors, our chefs craft exquisite dishes that will delight your palate in an elegant setting.",
    },
    {
      id: 4,
      icon: <FaDumbbell />,
      title: "Fitness Center",
      description:
        "Stay active during your stay with our state-of-the-art fitness center, equipped with the latest machines, free weights, and cardio equipment. Whether you are a fitness enthusiast or just looking to stretch, we have you covered.",
    },
    {
      id: 5,
      icon: <FaCar />,
      title: "Free Parking",
      description:
        "Enjoy the convenience of ample free parking spaces, located just steps from the hotel entrance. Our secure parking ensures the safety of your vehicle, giving you one less thing to worry about during your stay.",
    },
    {
      id: 6,
      icon: <FaPaw />,
      title: "Pet Friendly",
      description:
        "We welcome your furry companions with open arms! Our pet-friendly policies ensure a comfortable and enjoyable stay for you and your pets, complete with pet amenities and nearby walking areas.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="heading mb-20">
          <h2 className="text-3xl font-semibold text-center mb-3">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-center">
            {description}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {amenities.map((amenity) => (
            <div
              key={amenity.id}
              className="p-6 bg-gray-50 flex items-center flex-col justify-center  rounded-lg text-center"
            >
              <div className="text-4xl mb-4 text-primary ">{amenity.icon}</div>
              <h3 className="text-xl font-semibold">{amenity.title}</h3>
              <p className="text-gray-600 mt-2">{amenity.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Amenities;
