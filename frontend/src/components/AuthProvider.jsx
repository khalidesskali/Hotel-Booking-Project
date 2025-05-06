import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const AuthContext = createContext(null);

const TOKEN_KEY = "auth_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const USER_KEY = "auth_user";
const TOKEN_EXPIRY_KEY = "auth_token_expiry";

// Create axios instance with default config
const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Add request interceptor to add token to requests
  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor to handle token refresh
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If error is 401 and we haven't tried to refresh token yet
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
            if (!refreshToken) {
              throw new Error("No refresh token available");
            }

            const response = await api.post("/refresh-token", {
              refresh_token: refreshToken,
            });

            const { token, refresh_token } = response.data;

            // Update tokens in localStorage
            localStorage.setItem(TOKEN_KEY, token);
            localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token);

            // Update authorization header
            originalRequest.headers.Authorization = `Bearer ${token}`;

            // Retry the original request
            return api(originalRequest);
          } catch (refreshError) {
            // If refresh token fails, logout user
            handleLogout();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  // Initialize auth state from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(USER_KEY);
      const token = localStorage.getItem(TOKEN_KEY);
      const tokenExpiry = localStorage.getItem(TOKEN_EXPIRY_KEY);

      if (storedUser && token && tokenExpiry) {
        // Check if token is expired
        if (new Date().getTime() > parseInt(tokenExpiry)) {
          handleLogout();
        } else {
          setUser(JSON.parse(storedUser));
        }
      }
    } catch (err) {
      console.error("Error initializing auth state:", err);
      setError("Failed to initialize authentication state");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      // Call logout endpoint with authentication
      await api.post("/logout");

      // Clear local storage and state
      setUser(null);
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(TOKEN_EXPIRY_KEY);

      // Navigate to login
      navigate("/login");
    } catch (err) {
      console.error("Error during logout:", err);
      setError("Failed to logout properly");
      // Still clear local storage and state even if the server request fails
      setUser(null);
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(TOKEN_EXPIRY_KEY);
      navigate("/login");
    }
  }, [navigate]);

  const login = useCallback(async (userData) => {
    try {
      if (!userData?.token || !userData?.user) {
        throw new Error("Invalid user data provided");
      }

      // Set token expiry to 1 hour from now
      const tokenExpiry = new Date().getTime() + 60 * 60 * 1000;

      setUser(userData.user);
      localStorage.setItem(TOKEN_KEY, userData.token);
      localStorage.setItem(REFRESH_TOKEN_KEY, userData.refresh_token);
      localStorage.setItem(USER_KEY, JSON.stringify(userData.user));
      localStorage.setItem(TOKEN_EXPIRY_KEY, tokenExpiry.toString());
      setError(null);
    } catch (err) {
      console.error("Error during login:", err);
      setError("Failed to login properly");
      throw err;
    }
  }, []);

  // Check token expiry periodically
  useEffect(() => {
    const checkTokenExpiry = async () => {
      const tokenExpiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
      if (tokenExpiry && new Date().getTime() > parseInt(tokenExpiry)) {
        try {
          const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
          if (refreshToken) {
            const response = await api.post("/refresh-token", {
              refresh_token: refreshToken,
            });
            const { token, refresh_token } = response.data;
            localStorage.setItem(TOKEN_KEY, token);
            localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token);
            localStorage.setItem(
              TOKEN_EXPIRY_KEY,
              (new Date().getTime() + 60 * 60 * 1000).toString()
            );
          } else {
            handleLogout();
          }
        } catch (error) {
          handleLogout();
        }
      }
    };

    const intervalId = setInterval(checkTokenExpiry, 60000); // Check every minute
    return () => clearInterval(intervalId);
  }, [handleLogout]);

  const value = {
    user,
    loading,
    error,
    login,
    logout: handleLogout,
    isAuthenticated: !!user,
    api, // Expose the configured axios instance
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
