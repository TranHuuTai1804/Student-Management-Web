import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import { clientOrigin } from "./config/env.js";
import { errorHandler, notFound } from "./middleware/error.middleware.js";

const app = express();

// 🟢 Đặt CORS TRƯỚC cookieParser và routes
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/", routes);

// Error handlers
app.use(notFound);
app.use(errorHandler);

export default app;
