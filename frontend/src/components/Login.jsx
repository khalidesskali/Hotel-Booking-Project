import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthProvider";

function validateData(data) {
  const errors = {};

  if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(data.email)) {
    errors.email = true;
  }
  if (data.password === "") {
    errors.password = true;
  }

  return errors;
}

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: false, password: false });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateData(formData);
    setErrors(validationErrors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      const response = await signin(formData);
      console.log(response.data);

      // Store the token in localStorage
      login(response.data);

      setLoading(false);
      console.log("Login successful", response.data);

      navigate("/rooms");
    } catch (e) {
      console.error("An error has occurred", e);
      setLoading(false);

      if (e.response && e.response.status === 422) {
        setErrors({ ...errors, server: e.response.data.message });
      }
    }
  };

  const signin = async (data) => {
    const response = await axios.post("http://localhost:8000/api/login", data);
    return response;
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <form
          className="bg-white py-8 px-10 rounded-md shadow-md"
          onSubmit={handleSubmit}
        >
          <Link to="/">
            <h2 className="font-semibold text-4xl text-center mb-5">
              Stay<span className="text-primary">H</span>ome
            </h2>
          </Link>
          <div className="mb-4">
            <label htmlFor="mail" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              onChange={handleChange}
              placeholder="Enter your Email"
              className="focus-visible:ring-0 focus-visible:ring-offset-0"
              id="mail"
              name="email"
            />
            {errors.email && <div className="error">Invalid email address</div>}
          </div>
          <div className="mb-5">
            <label htmlFor="pass" className="mb-2 block">
              Password
            </label>
            <input
              type="password"
              onChange={handleChange}
              placeholder="Entery your password"
              className="focus-visible:ring-0 focus-visible:ring-offset-0"
              id="pass"
              name="password"
            />
            {errors.password && (
              <div className="error">Password is required</div>
            )}
          </div>
          <Button className="w-full block bg-primary mb-2" type="submit">
            {loading ? "Logging in..." : "Login"}
          </Button>
          <span className="block mx-auto font-medium w-fit text-sm ">
            don't you have an account?{"  "}
            <Link className="text-primary underline" to="/signup">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </>
  );
};

export default Login;
