import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

function validateForm(data) {
  const errors = {};
  const regEx = {
    name: /^[a-zA-Z]{2,20}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/,
  };

  if (!data.firstName.trim()) {
    errors.firstName = "Please fill out the field";
  } else if (!regEx.name.test(data.firstName)) {
    errors.firstName = "Invalid first name (2, 20 letters)";
  }

  if (!data.lastName.trim()) {
    errors.lastName = "Please fill out the field";
  } else if (!regEx.name.test(data.lastName)) {
    errors.lastName = "Invalid last name (2, 20 letters)";
  }

  if (!data.email.trim()) {
    errors.email = "Please fill out the field";
  } else if (!regEx.name.test(data.email)) {
    errors.email = "Invalid email address";
  }

  if (!data.password.trim()) {
    errors.password = "Please fill out the field";
  } else if (!regEx.name.test(data.password)) {
    errors.password =
      "Password must contain at least 8 characters (one number, one letter)";
  }

  return errors;
}

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    setErrors(errors);
  };

  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ top: "52%" }}
    >
      <form
        className="bg-white py-8 px-10 rounded-md shadow-md"
        onSubmit={handleSubmit}
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
          {errors.firstName && <div className="error">{errors.firstName}</div>}
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
          {errors.lastName && <div className="error">{errors.lastName}</div>}
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
          {errors.email && <div className="error">{errors.email}</div>}
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
          {errors.password && (
            <div className="error">
              Password must contain at least 8 characters, <br /> one letter and
              one number
            </div>
          )}
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
