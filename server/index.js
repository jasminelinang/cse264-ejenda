// server/index.js
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sql = require("./db");
require("dotenv").config();

const authRoutes = require("./authRoutes");
const eventsRoutes = require("./eventsRoutes");
const adminRoutes = require("./adminRoutes");

const app = express();

// ---------- CORS setup (allow dev origins) ----------
const envOrigin = (process.env.FRONTEND_ORIGIN || "").trim();
// allowedOrigins includes the common Vite/React dev host ports you used
const allowedOrigins = [
  envOrigin || null,
  "http://localhost:5173",
  "http://localhost:5174",
].filter(Boolean);

// CORS middleware that only returns an exact match
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (curl, Postman, server-to-server)
    if (!origin) {
      return callback(null, true);
    }

    // Trim incoming origin (defensive)
    const originTrim = String(origin).trim();

    if (allowedOrigins.includes(originTrim)) {
      // log for debugging preflight issues
      console.log(`[CORS] allowing origin: ${originTrim}`);
      return callback(null, true);
    }

    console.warn(`[CORS] rejecting origin: ${originTrim}`);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));

// middlewares
app.use(express.json());
app.use(cookieParser());

// ROOT ROUTE
app.get("/", (req, res) => {
  res.send("Ejenda API is running");
});

// AUTH ROUTES and EVENT ROUTES
app.use("/api/auth", authRoutes);
app.use("/api", eventsRoutes);
app.use("/api/admin", adminRoutes);

// DB TEST ROUTE
app.get("/test", async (req, res) => {
  try {
    const result = await sql`SELECT NOW()`;
    res.json(result);
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: err.message || "Database error" });
  }
});

// optional quick ping to verify server reachability
app.get("/ping", (req, res) => {
  res.send("pong");
});

// error handler for CORS rejection (gives clearer console message)
app.use((err, req, res, next) => {
  if (err && err.message && err.message.includes("Not allowed by CORS")) {
    return res.status(403).json({ error: "CORS error: origin not allowed" });
  }
  next(err);
});

// START SERVER
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
  console.log("Allowed CORS origins:", allowedOrigins);
});
