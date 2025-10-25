import React, { useState, useEffect } from "react";
import './Login.css'
import Scur from "../../assets/icon/scurity.png"

function Login() {

  const [identifier, setIdentifier] = useState(""); // 
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Sửa: dùng identifier thay vì username (trước đây chưa khai báo)
    if (!identifier.trim() || !password.trim()) {
      setError("Please enter full Username/Email and Password");
      return;
    }

    setLoading(true);
    // Giả lập chờ backend
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);

    // Sửa: lưu identifier thay vì username
    if (remember) localStorage.setItem("crt_username", identifier);
    else localStorage.removeItem("crt_username");

    alert("Đăng nhập (frontend-only) thành công! Sẽ nối backend sau.");
  };

  return (
    <div className="login">
      <div className="login__card">
        <div className="login__brand">
            <img src={Scur} className="brand-icon" alt="" />
          <span className="brand-name">CRT Encrypt</span>
        </div>

        <h1 className="login__title">Sign In</h1>
        <p className="login__subtitle">
          Enter your credentials to access your account.
        </p>

        {error && <div className="login__alert">{error}</div>}

        <form className="login__form" onSubmit={handleSubmit}>
          <label className="field">
            <span className="field__label">Username / Email</span>
            <input
              className="field__input"
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Enter your username or email"
            />
          </label>

          <label className="field">
            <span className="field__label">Password</span>
            <input
              className="field__input"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <div className="login__row">
            <label className="remember">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
            <a className="link" href="#">
              Forgot password?
            </a>
          </div>

          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="login__footer">
          <span>Don't have an account?</span>
          <a className="link" href="/signup">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  )
}

export default Login
