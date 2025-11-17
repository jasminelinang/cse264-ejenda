// server/index.js
const express = require("express");
const cors = require("cors");
const sql = require("./db"); 
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Test route — checks Supabase connection
app.get("/test", async (req, res) => {
  try {
    const result = await sql`SELECT NOW()`;
    res.json(result);
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

app.get("/", (req, res) => {
  res.send("Server is running!");
});
