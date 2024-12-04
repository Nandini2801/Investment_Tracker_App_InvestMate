/* eslint-disable react/prop-types */
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute(props) {
  const location = useLocation();
  const token = localStorage.getItem("token");
  if (!token || token === undefined) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{props.children}</>;
}

export default ProtectedRoute;

