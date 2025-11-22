// server/eventsRoutes.js
const express = require("express");
const router = express.Router();
const sql = require("./db");

// GET weekly events for a user
router.get("/events/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const events = await sql`
      SELECT *
      FROM weekly_events
      WHERE user_id = ${userId}
      ORDER BY day_index, created_at
    `;

    res.json(events);
  } catch (err) {
    console.error("Get events error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// CREATE a weekly event
router.post("/events", async (req, res) => {
  const { userId, dayIndex, title, type } = req.body;

  try {
    const inserted = await sql`
      INSERT INTO weekly_events (user_id, day_index, title, type)
      VALUES (${userId}, ${dayIndex}, ${title}, ${type})
      RETURNING *
    `;

    res.status(201).json(inserted[0]);
  } catch (err) {
    console.error("Create event error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
