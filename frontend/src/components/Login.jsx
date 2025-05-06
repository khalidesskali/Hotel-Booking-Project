import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthProvider";

const API_URL = "http://localhost:8000/api";

function validateData(data) {
  const errors = {};

  if (!data.email) {
    errors.email = "Email is required";
  } else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(data.email)) {
    errors.email = "Invalid email address";
  }

  if (!data.password) {
    errors.password = "Password is required";
  }

  return errors;
}

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/rooms");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      // Validate form data
      const validationErrors = validateData(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      const response = await axios.post(`${API_URL}/login`, formData);

      if (response.data) {
        // The backend returns { user, token }
        login({
          user: response.data.user,
          token: response.data.token,
        });
        navigate("/rooms");
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        // Handle Laravel validation errors
        if (error.response.status === 422) {
          const validationErrors = error.response.data.errors;
          if (validationErrors) {
            setErrors({
              email: validationErrors.email?.[0],
              password: validationErrors.password?.[0],
            });
          }
        } else {
          setErrors({ server: "An error occurred. Please try again." });
        }
      } else if (error.request) {
        setErrors({
          server: "No response from server. Please check your connection.",
        });
      } else {
        setErrors({ server: "An unexpected error occurred." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="h-screen grid place-content-center">
        <form
          className="bg-white p-6 rounded-md shadow-md"
          onSubmit={handleSubmit}
        >
          <Link to="/">
            <h2 className="font-semibold text-4xl text-center mb-5">
              Stay<span className="text-primary">H</span>ome
            </h2>
          </Link>

          {errors.server && <div className="error mb-4">{errors.server}</div>}

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
              value={formData.email}
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          <div className="mb-5">
            <label htmlFor="pass" className="mb-2 block">
              Password
            </label>
            <input
              type="password"
              onChange={handleChange}
              placeholder="Enter your password"
              className="focus-visible:ring-0 focus-visible:ring-offset-0"
              id="pass"
              name="password"
              value={formData.password}
            />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>
          <Button
            className="w-full block bg-primary mb-2"
            type="submit"
            disabled={loading}
          >
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
