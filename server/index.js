const express = require("express");
const cors = require("cors");
const sql = require("./db");
require("dotenv").config();

const authRoutes = require("./authRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// ROOT ROUTE
app.get("/", (req, res) => {
  res.send("Ejenda API is running");
});

// AUTH ROUTES
app.use("/api/auth", authRoutes);

// DB TEST ROUTE
app.get("/test", async (req, res) => {
  try {
    const result = await sql`SELECT NOW()`;
    res.json(result);
  } catch (err) {
    console.error("DB error:", err); // <- LOG FULL ERROR
    res.status(500).json({ error: err.message || "Database error" }); 
  }
});

// START SERVER
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});