import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import { clientOrigin } from "./config/env.js";
import { errorHandler, notFound } from "./middleware/error.middleware.js";

const app = express();

// 🟢 CORS cần bật credentials + origin chính xác

app.use(
  cors({
    origin: clientOrigin || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// KHÔNG cần app.options('*', cors()) trên Express 5

// 🟢 Đảm bảo parse JSON + cookie
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/", routes);

// 🧩 404 + error handler
app.use(notFound);
app.use(errorHandler);

export default app;
