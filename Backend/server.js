require("dotenv").config();

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error(
      "MySQL connect error:",
      err.code,
      err.sqlMessage || err.message
    );
    process.exit(1);
  }
  console.log("✅ MySQL connected!");
});

app.get("/", (req, res) => res.json({ ok: true }));

app.get("/users", (req, res) => {
  db.query("SELECT * FROM TAIKHOAN", (err, rows) => {
    if (err)
      return res.status(500).json({ error: err.code, detail: err.sqlMessage });
    res.json(rows);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server http://localhost:${PORT}`));
