// src/App.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

export default function App() {
  // Layout chính cho các route bảo vệ (RequireAuth)
  return <Navbar><Outlet /></Navbar>;
}
