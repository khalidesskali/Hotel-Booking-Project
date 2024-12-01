import { FaBed, FaMapMarkerAlt, FaTag } from "react-icons/fa";

const WhyChooseUs = ({ title, description }) => {
  const features = [
    {
      icon: <FaBed size={50} className="text-blue-600" />,
      title: "Luxury Rooms",
      subtitle: "Comfort Redefined",
      description:
        "Our rooms are designed with elegance and equipped with premium amenities for a perfect stay.",
    },
    {
      icon: <FaMapMarkerAlt size={50} className="text-blue-600" />,
      title: "Prime Locations",
      subtitle: "Unmatched Accessibility",
      description:
        "Stay at the heart of top destinations with easy access to major attractions and stunning views.",
    },
    {
      icon: <FaTag size={50} className="text-blue-600" />,
      title: "Exclusive Offers",
      subtitle: "Tailored for You",
      description:
        "Enjoy special discounts and deals that make luxury affordable without compromise.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-20">
          <h2 className="text-3xl font-semibold text-center mb-3">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-center">
            {description}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white flex flex-col justify-center items-center shadow-xl rounded-lg p-6 duration-300 hover:shadow-2xl"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mb-2 text-center">
                {feature.title}
              </h3>
              <h4 className="text-lg font-medium text-gray-500 mb-4 text-center">
                {feature.subtitle}
              </h4>
              <p className="text-gray-600 mb-6 text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
