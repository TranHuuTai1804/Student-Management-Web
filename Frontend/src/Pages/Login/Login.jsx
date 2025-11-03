import React, { useEffect, useMemo, useState } from "react";
import { Link, Form, useActionData, useNavigation} from "react-router-dom";
import "./Login.css";
import Scur from "../../assets/icon/scurity.png";   

function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const actionData = useActionData();
  const error = actionData?.error || "";
  const navigation = useNavigation();
  const loading = navigation.state === "submitting";

  useEffect(() => {
    const saved = localStorage.getItem("crt_username");
    if (saved) { setIdentifier(saved); setRemember(true); }
  }, []);

  const isEmail = useMemo(() => /@/.test(identifier), [identifier]);

  return (
    <div className="login">
      <div className="login__card" role="region" aria-labelledby="loginTitle">
        <div className="login__brand">
          <img src={Scur} className="brand-icon" alt="Security logo" />
          <span className="brand-name">CRT Encrypt</span>
        </div>

        <h1 id="loginTitle" className="login__title">Sign In</h1>
        <p className="login__subtitle">Enter your credentials to access your account.</p>

        <div aria-live="polite" className="sr-only" id="formMessage" />
        {!!error && (
          <div className="login__alert" role="alert" aria-live="assertive">{error}</div>
        )}

        <Form className="login__form" method="post" noValidate>
          <label className="field">
            <span className="field__label">Username / Email</span>
            <input
              className="field__input"
              type="text"
              name="identifier"
              inputMode={isEmail ? "email" : "text"}
              autoCapitalize="none"
              autoCorrect="off"
              autoComplete="username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Enter your username or email"
              aria-invalid={!!error && !identifier.trim()}
              aria-describedby={error && !identifier.trim() ? "formMessage" : undefined}
              required
              disabled={loading}
            />
          </label>

          <label className="field">
            <span className="field__label">Password</span>
            <div className="field__password">
              <input
                className="field__input"
                type={showPwd ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                aria-invalid={!!error && !password.trim()}
                aria-describedby={error && !password.trim() ? "formMessage" : undefined}
                minLength={6}
                required
                disabled={loading}
              />
              <button
                type="button"
                className="btn btn--ghost btn--sm"
                onClick={() => setShowPwd((s) => !s)}
                aria-pressed={showPwd}
                aria-label={showPwd ? "Hide password" : "Show password"}
                disabled={loading}
              >
                {showPwd ? "Hide" : "Show"}
              </button>
            </div>
          </label>

          <div className="login__row">
            <label className="remember">
              <input
                type="checkbox"
                name="remember"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                disabled={loading}
              />
              <span>Remember me</span>
            </label>
            <a className="link" href="#" onClick={(e) => e.preventDefault()}>Forgot password?</a>
          </div>

          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </Form>

        <div className="login__footer">
          <span>Don't have an account?</span>
          <a className="link" href="/signup">Sign Up</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
