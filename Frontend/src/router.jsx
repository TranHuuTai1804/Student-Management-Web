// src/router.jsx
import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App.jsx";
import Login from "./Pages/Login/Login.jsx";
import Signup from "./Pages/Signup/Signup.jsx";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import Academic from "./Pages/Academic/Academic.jsx";
import PersonalInfo from "./Pages/PersonalInfo/PersonalInfo.jsx";
import EncryptionKey from "./Pages/MyEncryptionKey/MEK.jsx";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

/* ===========================
   Loaders (guards)
=========================== */

// Chỉ đẩy về /dashboard nếu vào đúng đường /login mà đã có phiên
async function redirectIfAuthedLoader({ request }) {
  const url = new URL(request.url);
  if (url.pathname === "/login") {
    const r = await fetch(`${API_BASE}/auth/me`, { credentials: "include" });
    if (r.ok) throw redirect("/dashboard");
  }
  // /signup và các trang public khác KHÔNG bị chặn
  return null;
}

// Bắt buộc phải đăng nhập cho nhánh protected
async function requireAuthLoader() {
  const r = await fetch(`${API_BASE}/auth/me`, { credentials: "include" });
  if (r.ok) return null;
  throw redirect("/login");
}

/* ===========================
   Actions
=========================== */

export async function loginAction({ request }) {
  const fd = await request.formData();
  const identifier = (fd.get("identifier") || "").trim();
  const password   = (fd.get("password")   || "").trim();
  const remember   = fd.get("remember") === "on";

  if (!identifier || !password) {
    return new Response(JSON.stringify({ error: "Vui lòng điền đủ thông tin" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // gửi/nhận cookie httpOnly
    body: JSON.stringify({ identifier, password }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg =
      data?.error === "INVALID_CREDENTIALS" ? "Sai thông tin đăng nhập"
      : data?.error === "MISSING_CREDENTIALS" ? "Vui lòng điền đủ thông tin"
      : data?.detail || data?.error || "Login failed";
    return new Response(JSON.stringify({ error: msg }), {
      status: res.status || 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (remember) localStorage.setItem("crt_username", identifier);
  else localStorage.removeItem("crt_username");

  // Đăng nhập thành công → Dashboard
  throw redirect("/dashboard");
}

/* ===========================
   Router
=========================== */

export const router = createBrowserRouter([
  // Public routes
  {
    loader: redirectIfAuthedLoader,
    children: [
      { path: "/login",  element: <Login />,  action: loginAction },
      { path: "/signup", element: <Signup /> },
    ],
  },

  // Protected routes
  {
    loader: requireAuthLoader,
    children: [
      {
        path: "/",
        element: <App />, // App render Navbar + <Outlet />
        children: [
          { index: true, element: <Dashboard /> },       // "/" => Dashboard
          { path: "dashboard",      element: <Dashboard /> },
          { path: "academic",       element: <Academic /> },
          { path: "personal-info",  element: <PersonalInfo /> },
          { path: "encryption-key", element: <EncryptionKey /> },
        ],
      },
    ],
  },

  // Fallback
  { path: "*", element: <Dashboard /> },
]);
