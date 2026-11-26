import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.js";
import leadRoutes from "./routes/leads.js";

const app = express();
app.use(helmet());
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim().replace(/\/$/, ""));

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));
app.get("/api/health", (_req, res) =>
  res.json({ status: "ok", service: "LeadFlow API" }),
);
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
app.use((req, res) =>
  res
    .status(404)
    .json({ message: `Route ${req.method} ${req.originalUrl} not found.` }),
);
app.use((err, _req, res, _next) => {
  console.error(err);
  if (err.code === 11000)
    return res
      .status(409)
      .json({ message: "A record with this value already exists." });
  if (err.name === "ValidationError")
    return res.status(400).json({
      message: Object.values(err.errors)
        .map((e) => e.message)
        .join(" "),
    });
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal server error." });
});

const PORT = process.env.PORT || 5000;
if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  console.error(
    "Missing MONGO_URI or JWT_SECRET. Copy server/.env.example to server/.env.",
  );
  process.exit(1);
}
mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`LeadFlow API running on http://localhost:${PORT}`),
    ),
  )
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
