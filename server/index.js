// server/index.js
const express = require("express");
const cors = require("cors");
const sql = require("./db");
require("dotenv").config();

const authRoutes = require("./authRoutes");
const eventsRoutes = require("./eventsRoutes"); // 👈 make sure this filename exists

const app = express();
app.use(express.json());
app.use(cors());

// ROOT ROUTE
app.get("/", (req, res) => {
  res.send("Ejenda API is running");
});

// AUTH ROUTES and EVENT ROUTES
app.use("/api/auth", authRoutes);
app.use("/api", eventsRoutes);   // 👈 this now matches the const above

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

// START SERVER
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
