const express = require("express");
const sql = require("./db");
const adminOnly = require("./middleware/adminOnly");

const router = express.Router();

// GET all users (admin only)
router.get("/users", adminOnly, async (req, res) => {
  try {
    const users = await sql`
      SELECT id, name, email, height, weight, fitness_goal, diet_prefs, role
      FROM users
      ORDER BY id ASC
    `;
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// DELETE a user (admin only)
router.delete("/users/:id", adminOnly, async (req, res) => {
  const { id } = req.params;

  try {
    await sql`DELETE FROM users WHERE id = ${id}`;
    res.json({ message: "User deleted" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// GET a user's calendar (admin only)
router.get("/calendar/:userId", adminOnly, async (req, res) => {
  const { userId } = req.params;

  try {
    const events = await sql`
      SELECT * FROM calendar WHERE user_id = ${userId}
    `;
    res.json(events);
  } catch (err) {
    console.error("Error fetching calendar:", err);
    res.status(500).json({ error: "Failed to fetch calendar" });
  }
});

module.exports = router;