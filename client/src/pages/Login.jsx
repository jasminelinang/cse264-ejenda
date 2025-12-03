import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const API_BASE = "http://localhost:3000";

function Login() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [fitnessGoal, setFitnessGoal] = useState("");
  const [dietPrefs, setDietPrefs] = useState("");

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const isLogin = mode === "login";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    try {
      const endpoint = isLogin ? "login" : "signup";

      const res = await fetch(`${API_BASE}/api/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isLogin
            ? { email, password }
            : {
                name,
                email,
                password,
                height,
                weight,
                fitnessGoal,
                dietPrefs,
              }
        ),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      //if (data.token) {
          const { user, token } = data;

        localStorage.setItem("ejenda_user_name", user.name);
        localStorage.setItem("ejenda_is_admin", user.role === "admin");

        localStorage.setItem("ejenda_token", data.token);
        navigate("/dashboard");
     // }

    } catch (err) {
      console.error(err);
      setError("Network error");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        {/* title + back button on the same row */}
        <div className="auth-header-row">
          <h1>{isLogin ? "Login" : "Create an Account"}</h1>
          <button className="back-button" onClick={() => navigate("/")}>
            Go Back Home
          </button>
        </div>

        {/* Mode Switch */}
        <div className="mode-switch">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            className={!isLogin ? "active" : ""}
            onClick={() => setMode("signup")}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Only show during signup */}
          {!isLogin && (
            <>
              {/* NAME */}
              <div className="auth-field">
                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* HEIGHT */}
              <div className="auth-field">
                <label>Height</label>
                <select
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  required
                >
                  <option value="">Select height</option>
                  <option value="150">150 cm (4'11")</option>
                  <option value="155">155 cm (5'1")</option>
                  <option value="160">160 cm (5'3")</option>
                  <option value="165">165 cm (5'5")</option>
                  <option value="170">170 cm (5'7")</option>
                  <option value="175">175 cm (5'9")</option>
                  <option value="180">180 cm (5'11")</option>
                  <option value="185">185 cm (6'1")</option>
                </select>
              </div>

              {/* WEIGHT */}
              <div className="auth-field">
                <label>Weight</label>
                <select
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                >
                  <option value="">Select weight</option>
                  <option value="50">50 kg (110 lbs)</option>
                  <option value="55">55 kg (121 lbs)</option>
                  <option value="60">60 kg (132 lbs)</option>
                  <option value="65">65 kg (143 lbs)</option>
                  <option value="70">70 kg (154 lbs)</option>
                  <option value="75">75 kg (165 lbs)</option>
                  <option value="80">80 kg (176 lbs)</option>
                  <option value="85">85 kg (187 lbs)</option>
                  <option value="90">90 kg (198 lbs)</option>
                </select>
              </div>

              {/* FITNESS GOAL */}
              <div className="auth-field">
                <label>Fitness goal</label>
                <select
                  value={fitnessGoal}
                  onChange={(e) => setFitnessGoal(e.target.value)}
                >
                  <option value="">Select goal</option>
                  <option value="build muscle">Build muscle</option>
                  <option value="tone">Tone</option>
                  <option value="lose weight">Lose weight</option>
                  <option value="gain weight">Gain weight</option>
                  <option value="general health">General health</option>
                </select>
              </div>

              {/* DIET PREFS */}
              <div className="auth-field">
                <label>Dietary preference</label>
                <select
                  value={dietPrefs}
                  onChange={(e) => setDietPrefs(e.target.value)}
                >
                  <option value="">Select preference</option>
                  <option value="none">No preference</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="gluten free">Gluten-free</option>
                  <option value="dairy free">Dairy-free</option>
                  <option value="nut allergy">Nut allergy</option>
                  <option value="shellfish allergy">Shellfish allergy</option>
                   <option value="halal">Halal</option>

                </select>
              </div>
            </>
          )}

          {/* EMAIL */}
          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-submit">
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        {error && <p className="auth-error">{error}</p>}
        {message && <p className="auth-success">{message}</p>}
      </div>
    </div>
  );
}

export default Login;
