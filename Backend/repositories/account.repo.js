import { db } from "../db/index.js";

export async function findAccountByIdentifier(identifier) {
  const [r1] = await db.query(
    `SELECT USERNAME, PASSWORD_HASH, ROLE, Email, RELATED_ID
     FROM TAIKHOAN WHERE USERNAME = ? LIMIT 1`,
    [identifier]
  );
  if (r1.length) return r1[0];

  const [r2] = await db.query(
    `SELECT USERNAME, PASSWORD_HASH, ROLE, Email, RELATED_ID
     FROM TAIKHOAN WHERE Email = ? LIMIT 1`,
    [identifier]
  );
  return r2[0] || null;
}
