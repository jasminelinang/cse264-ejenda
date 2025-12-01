import React, { useState, useEffect } from "react";
import "./Gym_planner.css";

const presetRoutines = ["Core routine", "Toning routine", "Full-body routine"];

// Helper: Generate all hours from 6 AM to 10 PM
const dailyTimes = Array.from({ length: 16 }, (_, i) => {
  const hour = i + 6;
  return `${hour.toString().padStart(2, "0")}:00`;
});

export default function GymPlanner({ existingSchedule = [], onAddSession }) {
  const [freeSlots, setFreeSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [routine, setRoutine] = useState("");
  const [localSessions, setLocalSessions] = useState([]);

  // ---- AUTO-DETECT FREE HOURS ----
  useEffect(() => {
    const takenTimes = existingSchedule.map((e) => e.time);
    const free = dailyTimes.filter((t) => !takenTimes.includes(t));
    setFreeSlots(free);
  }, [existingSchedule]);

  // ---- USER ADDS A SESSION ----
  const handleAdd = () => {
    if (!selectedTime || !routine) return;

    const newSession = { time: selectedTime, routine };

    setLocalSessions([...localSessions, newSession]);

    if (onAddSession) onAddSession(newSession);

    setSelectedTime("");
    setRoutine("");
  };

  return (
    <div className="gym-box">
      <h2>Gym Scheduling & Workout Routines</h2>

      {/* Free Time Display */}
      <div className="free-time-box">
        <h4>Available Workout Times</h4>
        {freeSlots.length === 0 ? (
          <p>No free time today 😭</p>
        ) : (
          <div className="free-slot-list">
            {freeSlots.map((t) => (
              <span key={t} className="free-slot">{t}</span>
            ))}
          </div>
        )}
      </div>

      {/* Choose time & routine */}
      <div className="input-area">
        <select
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
        >
          <option value="">Pick a free time</option>
          {freeSlots.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <select value={routine} onChange={(e) => setRoutine(e.target.value)}>
          <option value="">Pick routine</option>
          {presetRoutines.map((r, idx) => (
            <option key={idx} value={r}>
              {r}
            </option>
          ))}
        </select>

        <button className="add-btn" onClick={handleAdd}>
          Add
        </button>
      </div>

      {/* Display planned sessions */}
      <h3>Your Added Gym Sessions</h3>
      <ul className="slot-list">
        {localSessions.map((s, i) => (
          <li key={i} className="slot-item">
            <strong>{s.time}</strong> — {s.routine}
          </li>
        ))}
      </ul>
    </div>
  );
}