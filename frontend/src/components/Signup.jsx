import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const validateForm = (formData) => {
  const errors = {};

  if (!formData.firstName.trim()) {
    errors.firstName = true;
  }
  if (!formData.lastName.trim()) {
    errors.lastName = true;
  }
  if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
    errors.email = true;
  }
  if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(formData.password)) {
    errors.password = true;
  }

  return errors;
};

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const location = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      const updatedErrors = { ...errors };
      delete updatedErrors[name];
      setErrors(updatedErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm(formData);
    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    // Set loading to true when submission starts
    setLoading(true);

    try {
      const response = await submitFormData(formData);
      console.log(response.data);
      setLoading(false);
      setSuccessMessage("Signup successful! Redirecting to login...");
      setTimeout(() => location("/login"), 2000);
    } catch (error) {
      console.error("an error has occured", error);
      setLoading(false);
      setErrorMessage("There was an error processing your request.");
    }
  };

  const submitFormData = async (data) => {
    const response = await axios.post("http://localhost:8000/api/signup", data);
    return response;
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
          {errors.firstName && (
            <div className="error">First name is required</div>
          )}
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
          {errors.lastName && (
            <div className="error">Last name is required</div>
          )}
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
          {errors.email && <div className="error">Invalid email address</div>}
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
              password must contain at least 8 characters, <br /> one letter and
              one number
            </div>
          )}
        </div>
        <Button
          className="w-full block bg-primary mb-2"
          type="submit"
          disabled={loading}
        >
          Signup
        </Button>
        {loading && (
          <div className="flex items-center justify-center mt-4">
            {" "}
            <svg
              className="animate-spin h-5 w-5 text-indigo-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              {" "}
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>{" "}
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>{" "}
            </svg>{" "}
            <span className="ml-2 text-indigo-500">Loading...</span>{" "}
          </div>
        )}{" "}
        {successMessage && (
          <p className="mt-4 text-green-500">{successMessage}</p>
        )}{" "}
        {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
        <span className="block mx-auto font-medium w-fit text-sm ">
          already have an account?{"  "}
          <Link
            className="text-primary underline"
            to="/login"
            disabled={loading}
          >
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
