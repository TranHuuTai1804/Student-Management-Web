import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Navbar from "./components/Navbar/Navbar";
import Academic from "./Pages/Academic/Academic";
import PersonalInfo from "./Pages/PersonalInfo/PersonalInfo";
import EncryptionKey from "./Pages/MyEncryptionKey/MEK";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth không dùng Navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={<Navbar />}>
          {/* nếu vào "/", tự chuyển sang "/dashboard" */}
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="academic" element={<Academic />} />
          <Route path="personal-info" element={<PersonalInfo />} />
          <Route path="encryption-key" element={<EncryptionKey />} />
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
