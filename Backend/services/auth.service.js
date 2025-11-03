import { findAccountByIdentifier } from "../repositories/account.repo.js";
import { verifyPassword } from "../utils/password.js";
import { signJwt } from "../utils/jwt.js";
import { db } from "../db/index.js"; // chỉ để log DB đang dùng (debug)

export async function loginService({ identifier, password }) {
  const id = identifier?.trim() || "";
  const pwd = password?.trim() || "";

  if (!id || !pwd) {
    return { ok: false, status: 400, error: "MISSING_CREDENTIALS" };
  }

  // Lấy thông tin user (repo nên ưu tiên USERNAME rồi mới Email)
  const acc = await findAccountByIdentifier(id);
  if (!acc) {
    return { ok: false, status: 401, error: "INVALID_CREDENTIALS" };
  }

  const [[dbInfo]] = await db.query("SELECT DATABASE() AS db");
  console.log("DB_IN_USE =", dbInfo.db);

  console.log("LOGIN id =", id);
  console.log("ROW  =>", acc?.USERNAME, acc?.Email);

  const hash = String(acc.PASSWORD_HASH ?? "").trim();
  console.log("HASH_LEN =", hash.length);
  console.log(
    "HASH_EQ_EXPECTED =",
    hash === "$2a$10$eBPhDdVax/sK6wH5rxmTgO6j63DpB.bZ3zTkVxD6v4dV5T0s7F4cW"
  );

  // ===== DIAGNOSTIC LOGS (xóa sau khi ok) =====
  try {
    const [[dbInfo]] = await db.query("SELECT DATABASE() AS db");
    console.log("DB_IN_USE =", dbInfo?.db);
  } catch {}
  console.log("LOGIN id =", id);
  console.log(
    "ROW  =>",
    acc?.USERNAME,
    acc?.Email,
    "hashLen=",
    hash.length,
    "hashHead=",
    hash.slice(0, 7)
  );
  // ============================================

  // So khớp mật khẩu
  const ok = await verifyPassword(pwd, hash); // bcrypt.compare
  console.log("BCRYPT =>", ok); // DEBUG

  if (!ok) {
    return { ok: false, status: 401, error: "INVALID_CREDENTIALS" };
  }

  const payload = { sub: acc.USERNAME, role: acc.ROLE, rid: acc.RELATED_ID };
  const token = signJwt(payload);

  const user = {
    username: acc.USERNAME,
    role: acc.ROLE,
    email: acc.Email,
    relatedId: acc.RELATED_ID,
  };

  return { ok: true, status: 200, token, user };
}
