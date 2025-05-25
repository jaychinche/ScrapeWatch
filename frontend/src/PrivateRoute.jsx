import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import React from "react";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  console.log("Token:", token);

  if (!token) {
  
    return <Navigate to="/sign-in" replace />;
  }

  try {
    const decoded = jwtDecode(token); 
    if (!decoded) throw new Error("Invalid token");
    return children;
  } catch (err) {
    console.error("Token error:", err);
    localStorage.removeItem("token");
    alert("Invalid session. Please log in again.");
    return <Navigate to="/sign-in" replace />;
  }
};
export default PrivateRoute;
