import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="bg-gray-100 flex items-center justify-center"
      style={{ height: "calc(100vh - 72px)" }}
    >
      <form
        className="bg-white py-8 px-10 rounded-md shadow-md"
        onSubmit={(e) => e.preventDefault()}
      >
        <h2 className="font-semibold text-4xl text-center mb-5">StayHome</h2>
        <div className="mb-4">
          <label htmlFor="first-name" className="mb-1 block">
            First name
          </label>
          <input
            type="text"
            value={formData.firstName}
            name="firstName"
            placeholder="Enter your username"
            id="first-name"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="last-name" className="mb-1 block">
            Last Name
          </label>
          <input
            type="text"
            value={formData.lastName}
            name="lastName"
            placeholder="Enter your username"
            className="focus-visible:ring-0 focus-visible:ring-offset-0"
            id="last-name"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="mail" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            name="email"
            placeholder="Enter your Email"
            className="focus-visible:ring-0 focus-visible:ring-offset-0"
            id="mail"
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="pass" className="mb-2 block">
            Password
          </label>
          <input
            type="password"
            value={formData.password}
            name="password"
            placeholder="Entery your password"
            className="focus-visible:ring-0 focus-visible:ring-offset-0"
            id="pass"
            onChange={handleChange}
          />
        </div>
        <Button className="w-full block bg-primary mb-2" type="submit">
          Signup
        </Button>
        <span className="block mx-auto font-medium w-fit text-sm ">
          already have an account?{"  "}
          <Link className="text-primary underline" to="/login">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
