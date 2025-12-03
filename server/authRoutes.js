// server/authRoutes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sql = require("./db");

const router = express.Router();

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  const {
    name,
    email,
    password,
    height,
    weight,
    fitnessGoal,
    dietPrefs,
  } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  try {
    // check if user exists
    const existing = await sql`
      SELECT id FROM users WHERE email = ${email}
    `;
    if (existing.length > 0) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // convert height/weight from string → integer (or null)
    const parsedHeight = height ? parseInt(height, 10) : null;
    const parsedWeight = weight ? parseInt(weight, 10) : null;

    // default role = "user" unless explicitly set
    const assignedRole = role || "user";

    const inserted = await sql`
      INSERT INTO users
        (name, email, password_hash, height, weight, fitness_goal, diet_prefs, role)
      VALUES
        (${name}, ${email}, ${passwordHash},
         ${parsedHeight}, ${parsedWeight}, ${fitnessGoal}, ${dietPrefs}, ${assignedRole})
      RETURNING
        id, name, email, height, weight, fitness_goal, diet_prefs, role, created_at
    `;

    const user = inserted[0];

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || "dev-secret",
      { expiresIn: "7d" }
    );

    res.status(201).json({ user, token });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  try {
    const users = await sql`
      SELECT id, name, email, password_hash,
             height, weight, fitness_goal, diet_prefs, role
      FROM users
      WHERE email = ${email}
    `;

    if (users.length === 0) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const user = users[0];

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || "dev-secret",
      { expiresIn: "7d" }
    );

    // don’t send password_hash back
    delete user.password_hash;

    res.json({ user, token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
