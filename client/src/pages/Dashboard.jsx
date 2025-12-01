import React, { useState, useEffect } from "react";
import "./Dashboard.css";
// Added
import LogoutButton from "./LogoutButton.jsx";


const API_BASE = "http://localhost:3000"; 

const days = ["S", "M", "T", "W", "Th", "F", "Sa"];

const sampleAffirmations = [
  "I am capable of achieving my goals.",
  "I honor my body by taking care of it.",
  "Small steps today create big results tomorrow.",

];


// const sampleRecipes = [
//   {
//     id: 1,
//     name: "Protein Pasta",
//     time: "40 minutes",
//     ingredients: "Chicken, pasta, broccoli, cheese",
//     imageUrl:
//       "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress",
//   },
//   {
//     id: 2,
//     name: "Overloaded Potatoes",
//     time: "35 minutes",
//     ingredients: "Potatoes, cheese, veggies",
//     imageUrl:
//       "https://images.pexels.com/photos/4106483/pexels-photo-4106483.jpeg?auto=compress",
//   },
// ];

function Dashboard() {
  const storedName =
    localStorage.getItem("ejenda_name") ||
    localStorage.getItem("ejenda_user_name") ||
    "Friend";

  const [affirmation, setAffirmation] = useState(sampleAffirmations[0]);
  const [groceryList, setGroceryList] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [events, setEvents] = useState([]); 

  const [newEventDay, setNewEventDay] = useState("M");
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventType, setNewEventType] = useState("gym");

  const [exerciseCategories, setExerciseCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [weeklyRecipes, setWeeklyRecipes] = useState([]);


  useEffect(() => {
    const random =
      sampleAffirmations[Math.floor(Math.random() * sampleAffirmations.length)];
    setAffirmation(random);
  }, []);

  useEffect(() => {
  async function loadCategories() {
    try {
      const res = await fetch("https://wger.de/api/v2/exercisecategory/");
      const data = await res.json();
      setExerciseCategories(data.results); // only broad categories
    } catch (err) {
      console.error("Failed to load gym categories", err);
    } finally {
      setLoadingCategories(false);
    }
  }

  loadCategories();
  }, []);

  useEffect(() => {
  async function loadOrRefreshWeeklyMeals() {
    const saved = localStorage.getItem("weekly_meals");
    const savedTime = localStorage.getItem("weekly_meals_timestamp");

    // If we have saved meals AND timestamp is < 7 days old → reuse it
    if (saved && savedTime) {
      const age = Date.now() - Number(savedTime);
      const sevenDays = 7 * 24 * 60 * 60 * 1000;

      if (age < sevenDays) {
        setWeeklyRecipes(JSON.parse(saved));
        return; // 👍 skip fetching
      }
    }

    // Otherwise → fetch 3 new recipes
    const recipes = [];
    for (let i = 0; i < 2; i++) {
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      const data = await res.json();
      if (data.meals?.[0]) recipes.push(data.meals[0]);
    }

    // Save for next time
    localStorage.setItem("weekly_meals", JSON.stringify(recipes));
    localStorage.setItem("weekly_meals_timestamp", Date.now().toString());

    setWeeklyRecipes(recipes);
  }

  loadOrRefreshWeeklyMeals();
}, []);

async function refreshWeeklyMeals() {
  const recipes = [];

  for (let i = 0; i < 2; i++) {
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const data = await res.json();
    if (data.meals?.[0]) recipes.push(data.meals[0]);
  }

  localStorage.setItem("weekly_meals", JSON.stringify(recipes));
  localStorage.setItem("weekly_meals_timestamp", Date.now().toString());

  setWeeklyRecipes(recipes);
}

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

          {/*logout*/}
          <LogoutButton />
        </div>

        <nav className="dash-nav">
          <span className="dash-nav-item dash-nav-active">Dashboard</span>
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

          {/* add event form */}
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

              {newEventType === "gym" ? (
                <select
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                >
                  <option value="">Select exercise category</option>

                  {loadingCategories ? (
                    <option>Loading...</option>
                  ) : (
                    exerciseCategories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))
                  )}
                </select>
              ) : (
                <input
                  type="text"
                  placeholder="Meal prep, study, etc."
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                />
              )}
            </div>

            <button type="submit" className="dash-add-btn">
              Add to week
            </button>
          </form>
        </section>
        
        {/* grocery + recipes */}
        <section className="dash-bottom-row">
          <div className="dash-grocery-card" style={{ position: "relative" }}>
            <h3 style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              Grocery List
              <button
                onClick={() => {
                  setGroceryList([
                    ...groceryList,
                    { id: nextId, text: "", checked: false, editing: true }
                  ]);
                  setNextId(nextId + 1);
                }}
                style={{
                  border: "none",
                  background: "#646cff",
                  color: "white",
                  borderRadius: "50%",
                  width: "28px",
                  height: "28px",
                  cursor: "pointer",
                  fontSize: "20px",
                  lineHeight: "26px",
                  padding: 0
                }}
              >
                +
              </button>
            </h3>

            <ul style={{ listStyle: "none", padding: 0, marginTop: "10px" }}>
              {groceryList.map((item) => (
                <li
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "8px",
                    gap: "8px"
                  }}
                >
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() =>
                      setGroceryList(
                        groceryList.map((g) =>
                          g.id === item.id ? { ...g, checked: !g.checked } : g
                        )
                      )
                    }
                  />

                  {/* If editing, show input box */}
                  {item.editing ? (
                    <input
                      type="text"
                      value={item.text}
                      autoFocus
                      placeholder="New item..."
                      onChange={(e) =>
                        setGroceryList(
                          groceryList.map((g) =>
                            g.id === item.id ? { ...g, text: e.target.value } : g
                          )
                        )
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setGroceryList(
                            groceryList.map((g) =>
                              g.id === item.id
                                ? { ...g, editing: false, text: g.text.trim() }
                                : g
                            )
                          );
                        }
                      }}
                      style={{
                        flex: 1,
                        padding: "6px",
                        borderRadius: "6px",
                        border: "1px solid #ccc"
                      }}
                    />
                  ) : (
                    /* Final text display */
                    <span
                      onClick={() =>
                        setGroceryList(
                          groceryList.map((g) =>
                            g.id === item.id ? { ...g, editing: true } : g
                          )
                        )
                      }
                      style={{
                        flex: 1,
                        cursor: "pointer",
                        textDecoration: item.checked ? "line-through" : "none"
                      }}
                    >
                      {item.text || "Untitled"}
                    </span>
                  )}

                  <button
                    onClick={() =>
                      setGroceryList(groceryList.filter((g) => g.id !== item.id))
                    }
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: "#888",
                      fontSize: "18px"
                    }}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* <div className="dash-recipes-card">
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
          </div> */}

          <div className="dash-recipes-card">
            <h3>This week's recipes:</h3>
            <div className="dash-recipe-list">

              {weeklyRecipes.length === 0 ? (
                <p>Loading recipes...</p>
              ) : (
                weeklyRecipes.map(meal => (
                  <div key={meal.idMeal} className="dash-recipe-item">
                    
                    <img 
                      src={meal.strMealThumb} 
                      alt={meal.strMeal} 
                      className="dash-recipe-image" 
                    />

                    <div className="dash-recipe-info">
                      <div className="dash-recipe-name">{meal.strMeal}</div>

                      <div className="dash-recipe-meta">
                        Category: {meal.strCategory || "N/A"}
                      </div>

                      <div className="dash-recipe-ingredients">
                        Ingredients: {
                          [
                            meal.strIngredient1,
                            meal.strIngredient2,
                            meal.strIngredient3,
                            meal.strIngredient4
                          ]
                            .filter(Boolean)
                            .join(", ")
                        }
                      </div>
                    </div>
                  </div>
                ))
              )}

            </div>

                                      <button 
      onClick={refreshWeeklyMeals}
      className="refresh-btn"
    >
      Refresh Weekly Meals
    </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
