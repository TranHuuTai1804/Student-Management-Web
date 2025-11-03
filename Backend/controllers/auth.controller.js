import { loginService } from "../services/auth.service.js";
import { setAuthCookie } from "../utils/jwt.js";

export async function login(req, res, next) {
  try {
    const result = await loginService(req.body || {});
    if (!result.ok) {
      return res.status(result.status).json({ error: result.error });
    }
    setAuthCookie(res, result.token);
    return res.json({ token: result.token, user: result.user });
  } catch (err) {
    next(err);
  }
}

export async function logout(_req, res) {
  res.clearCookie("access_token", { path: "/" });
  res.json({ ok: true });
}

export async function me(req, res) {
  // user đã được gắn từ middleware auth
  res.json({ user: req.user });
}
