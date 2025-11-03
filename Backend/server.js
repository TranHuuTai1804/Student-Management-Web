import app from "./app.js";
import { db } from "./db/index.js";
import "./config/env.js";

await db.query("SELECT 1");
console.log("✅ MySQL connected!");

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("🚀 API running at http://localhost:" + PORT);
});
