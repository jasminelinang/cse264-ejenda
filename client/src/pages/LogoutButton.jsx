import { useNavigate } from "react-router-dom";
import React from "react";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      // remove token for logout
      localStorage.removeItem("ejenda_token");
      localStorage.removeItem("ejenda_name");
      localStorage.removeItem("ejenda_weight");
      localStorage.removeItem("ejenda_height");
      localStorage.removeItem("ejenda_proteinGoal");
      localStorage.removeItem("ejenda_dietPrefs");
      localStorage.removeItem("ejenda_allergies");

      // go back to login
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <button
      type="button" 
      onClick={handleLogout}
      style={{
        padding: "0.5rem 1rem",
        cursor: "pointer",
        marginTop: "1rem",
        backgroundColor: "#d6502f",
        color: "white",
        border: "none",
        borderRadius: "4px",
      }}
    >
      Logout
    </button>
  );
}

export default LogoutButton;
