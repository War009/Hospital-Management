import React from "react";
import { Navigate } from "react-router-dom";
import { getToken, getRole } from "../services/auth";

const ProtectedRoute = ({ children, adminOnly=false })=>{
  const token = getToken();
  const role = getRole();
  if(!token) return <Navigate to="/login" />;
  if(adminOnly && role!=="admin") return <Navigate to="/dashboard" />;
  return children;
};

export default ProtectedRoute;
