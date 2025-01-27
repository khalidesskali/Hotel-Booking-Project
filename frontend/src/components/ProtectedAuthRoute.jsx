import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "./AuthProvider";

const ProtectedAuthRoute = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/rooms" replace />;
  }

  return <Outlet />;
};

export default ProtectedAuthRoute;
