import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    height: "",
    weight: "",
    goal: "",
    diet: "",
  });

  function handleChange(e) {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  }

  function handleSave(e) {
    e.preventDefault();
    console.log("Saved settings:", formData);


    alert("Settings saved!");
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Settings</h1>

      <form style={styles.form} onSubmit={handleSave}>
        
        {/* NAME */}
        <label style={styles.label}>Name</label>
        <input
          type="text"
          name="name"
          style={styles.input}
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />

        {/* HEIGHT */}
        <label style={styles.label}>Height</label>
        <select
          name="height"
          style={styles.select}
          value={formData.height}
          onChange={handleChange}
        >
          <option value="">Select height</option>
          <option value="5'0">5'0"</option>
          <option value="5'2">5'2"</option>
          <option value="5'4">5'4"</option>
          <option value="5'6">5'6"</option>
          <option value="5'8">5'8"</option>
          <option value="5'10">5'10"</option>
          <option value="6'0">6'0"</option>
        </select>

        {/* WEIGHT */}
        <label style={styles.label}>Weight</label>
        <select
          name="weight"
          style={styles.select}
          value={formData.weight}
          onChange={handleChange}
        >
          <option value="">Select weight</option>
          <option value="100">100 lbs</option>
          <option value="120">120 lbs</option>
          <option value="140">140 lbs</option>
      <option value="160">160 lbs</option>
          <option value="180">180 lbs</option>
          <option value="200">200 lbs</option>
        </select>

        {/* FITNESS GOAL */}
        <label style={styles.label}>Fitness Goal</label>
        <select
          name="goal"
          style={styles.select}
          value={formData.goal}
          onChange={handleChange}
        >
          <option value="">Select goal</option>
          <option value="lose">Lose weight</option>
          <option value="tone">Tone up</option>
          <option value="muscle">Build muscle</option>
          <option value="maintain">Maintain fitness</option>
        </select>

        {/* DIET */}
        <label style={styles.label}>Dietary Preference</label>
        <select
          name="diet"
          style={styles.select}
          value={formData.diet}
          onChange={handleChange}
        >
          <option value="">Select diet</option>
          <option value="none">No preference</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="gluten-free">Gluten-Free</option>
          <option value="dairy-free">Dairy-Free</option>
          <option value="nut-allergy">Nut-Allergy</option>
          <option value="halal">Halal</option>


        </select>

        <button type="submit" style={styles.saveButton}>
          Save Settings
        </button>

        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          style={styles.backButton}
        >
          ← Back to Dashboard
        </button>
      </form>
    </div>
  );
}

export default Settings;

//styling stuffs
const styles = {
  container: {
    maxWidth: "450px",
    margin: "40px auto",
    padding: "20px",
    borderRadius: "12px",
    background: "#f5f5f5",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  label: {
    fontWeight: "600",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  select: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    background: "white",
  },
  saveButton: {
    padding: "12px",
    background: "#f0cb3a",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
  },
  backButton: {
    padding: "12px",
    background: "#ddd",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    marginTop: "10px",
  },
};
