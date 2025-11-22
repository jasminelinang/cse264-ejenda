import React, { useState, useEffect } from "react";
import "./Dashboard.css";

const API_BASE = "http://localhost:3000"; // for later when you save to backend

const days = ["S", "M", "T", "W", "Th", "F", "Sa"];

const sampleAffirmations = [
  "I am capable of achieving my goals.",
  "I honor my body by taking care of it.",
  "Small steps today create big results tomorrow.",
];

const sampleRecipes = [
  {
    id: 1,
    name: "Protein Pasta",
    time: "40 minutes",
    ingredients: "Chicken, pasta, broccoli, cheese",
    imageUrl:
      "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress",
  },
  {
    id: 2,
    name: "Overloaded Potatoes",
    time: "35 minutes",
    ingredients: "Potatoes, cheese, veggies",
    imageUrl:
      "https://images.pexels.com/photos/4106483/pexels-photo-4106483.jpeg?auto=compress",
  },
];

function Dashboard() {
  // pull name from localStorage if you saved it on login
  const storedName =
    localStorage.getItem("ejenda_name") ||
    localStorage.getItem("ejenda_user_name") ||
    "Friend";

  const [affirmation, setAffirmation] = useState(sampleAffirmations[0]);
  const [groceryText, setGroceryText] = useState("");
  const [events, setEvents] = useState([]); // { id, dayIndex, title, type }

  const [newEventDay, setNewEventDay] = useState("M");
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventType, setNewEventType] = useState("gym");

  // pick a random affirmation when dashboard loads
  useEffect(() => {
    const random =
      sampleAffirmations[Math.floor(Math.random() * sampleAffirmations.length)];
    setAffirmation(random);
  }, []);

  // TODO: later – load events from backend for this user
  // useEffect(() => {
  //   fetch(`${API_BASE}/api/events`)
  //     .then(res => res.json())
  //     .then(data => setEvents(data))
  //     .catch(err => console.error("Error loading events:", err));
  // }, []);

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;

    const dayIndex = days.indexOf(newEventDay);
    const newEvent = {
      id: Date.now(),
      dayIndex,
      title: newEventTitle.trim(),
      type: newEventType,
    };

    setEvents((prev) => [...prev, newEvent]);

    // TODO: later – POST to backend
    // fetch(`${API_BASE}/api/events`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(newEvent),
    // });

    setNewEventTitle("");
  };

  const eventsForDay = (dayIndex) =>
    events.filter((ev) => ev.dayIndex === dayIndex);

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="dash-sidebar">
        <div className="dash-logo-row">
          <button className="dash-menu-btn">≡</button>
          <div className="dash-logo">Ejenda</div>
        </div>
        <div className="dash-welcome">
          <p className="dash-welcome-label">Welcome back,</p>
          <p className="dash-welcome-name">{storedName}</p>
        </div>
        <nav className="dash-nav">
          <span className="dash-nav-item dash-nav-active">Dashboard</span>
          <span className="dash-nav-item">Gym planner (soon)</span>
          <span className="dash-nav-item">Meal planner (soon)</span>
          <span className="dash-nav-item">Settings</span>
        </nav>
      </aside>

      {/* Main content */}
      <main className="dash-main">
        {/* Affirmation */}
        <section className="dash-affirmation-card">
          <p>{affirmation}</p>
        </section>

        {/* Weekly calendar */}
        <section className="dash-week-section">
          <div className="dash-week-header">
            <div>
              <h2>Weekly Calendar</h2>
              <p className="dash-week-subtitle">Plan your gym + meals</p>
            </div>
            <div className="dash-add-label">Add a block</div>
          </div>
          <div className="dash-week-days-row">
            {days.map((d) => (
              <span key={d} className="dash-week-day-label">
                {d}
              </span>
            ))}
          </div>

          <div className="dash-week-grid">
            {days.map((d, index) => (
              <div key={d} className="dash-day-card">
                {eventsForDay(index).length === 0 ? (
                  <span className="dash-day-empty">No events</span>
                ) : (
                  <ul className="dash-events-list">
                    {eventsForDay(index).map((ev) => (
                      <li key={ev.id} className={`dash-event dash-event-${ev.type}`}>
                        <span className="dash-event-type">
                          {ev.type === "gym" ? "🏋️" : ev.type === "meal" ? "🍽️" : "📝"}
                        </span>
                        <span className="dash-event-title">{ev.title}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Quick add event form */}
          <form className="dash-add-form" onSubmit={handleAddEvent}>
            <div className="dash-add-field">
              <label>Day</label>
              <select
                value={newEventDay}
                onChange={(e) => setNewEventDay(e.target.value)}
              >
                {days.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div className="dash-add-field">
              <label>Type</label>
              <select
                value={newEventType}
                onChange={(e) => setNewEventType(e.target.value)}
              >
                <option value="gym">Gym</option>
                <option value="meal">Meal prep</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="dash-add-field dash-add-field-wide">
              <label>Title</label>
              <input
                type="text"
                placeholder="Leg day, meal prep, etc."
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
              />
            </div>

            <button type="submit" className="dash-add-btn">
              Add to week
            </button>
          </form>
        </section>

        {/* Bottom layout: grocery + recipes */}
        <section className="dash-bottom-row">
          {/* Grocery list */}
          <div className="dash-grocery-card">
            <h3>Grocery List</h3>
            <textarea
              value={groceryText}
              onChange={(e) => setGroceryText(e.target.value)}
              placeholder="- Chicken\n- Pasta\n- Veggies"
            />
          </div>

          {/* Recipes */}
          <div className="dash-recipes-card">
            <h3>This week&apos;s recipes:</h3>
            <div className="dash-recipe-list">
              {sampleRecipes.map((r) => (
                <div key={r.id} className="dash-recipe-item">
                  <img
                    src={r.imageUrl}
                    alt={r.name}
                    className="dash-recipe-image"
                  />
                  <div className="dash-recipe-info">
                    <div className="dash-recipe-name">{r.name}</div>
                    <div className="dash-recipe-meta">
                      Estimated time: {r.time}
                    </div>
                    <div className="dash-recipe-ingredients">
                      Ingredients: {r.ingredients}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
