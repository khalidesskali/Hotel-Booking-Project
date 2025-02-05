import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "./AuthProvider";

const ProtectedAuthRoute = () => {
  const { user } = useAuth();

  if (user) {
    const lastPage = localStorage.getItem("lastPage");

    return lastPage ? (
      <Navigate to={lastPage} replace />
    ) : (
      <Navigate to="/rooms" replace />
    );
  }

  return <Outlet />;
};

export default ProtectedAuthRoute;
