import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; //
import "./adminDashboard.css";

const API_BASE = "http://localhost:3000"; // backend URL

export default function AdminDashboard() {
    const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [expandedUser, setExpandedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load users on mount
  useEffect(() => {
    loadUsers();
  }, []);

  // Fetch all users
  async function loadUsers() {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("ejenda_token"); // get JWT from localStorage
    if (!token) {
      setError("Missing token. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to fetch users");
      }

      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("Unexpected data format");
      setUsers(data);
    } catch (err) {
      console.error("Error loading users:", err);
      setError(err.message);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }

  // Expand/collapse user details
  function toggleUser(id) {
    setExpandedUser(prev => (prev === id ? null : id));
  }

  // Delete a user
  async function deleteUser(id) {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Missing token. Please log in again.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/admin/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to delete user");
      }

      setUsers(prev => prev.filter(u => u.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete user: " + err.message);
    }
  }

  if (loading) return <div className="admin-loading">Loading users...</div>;
  if (error) return <div className="admin-error">Error: {error}</div>;

  return (
    <div className="admin-dashboard">
        {/* Back button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="admin-back-btn"
        style={{
          marginBottom: "20px",
          padding: "8px 12px",
          background: "#ffb703",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          color: "#fff",
          fontWeight: "600"
        }}
      >
        ← Back to Dashboard
      </button>
      <h1>Admin Dashboard</h1>
      <p className="admin-subtitle">Manage all registered users</p>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="admin-user-list">
          {users.map(user => (
            <div key={user.id} className="admin-user-card">
              <div className="admin-user-header">
                <div>
                  <strong>{user.name}</strong>
                  <span className="admin-email"> ({user.email})</span>
                </div>

                <div className="admin-buttons">
                  <button onClick={() => toggleUser(user.id)}>
                    {expandedUser === user.id ? "▲" : "▼"}
                  </button>
                  <button onClick={() => deleteUser(user.id)}>Delete</button>
                </div>
              </div>

              {expandedUser === user.id && (
                <div className="admin-user-details">
                  <p><strong>User ID:</strong> {user.id}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Role:</strong> {user.role}</p>
                  <p><strong>Created:</strong> {user.created_at || "N/A"}</p>
                  <p><strong>Last Login:</strong> {user.last_login || "N/A"}</p>
                  {user.height && <p><strong>Height:</strong> {user.height}</p>}
                  {user.weight && <p><strong>Weight:</strong> {user.weight}</p>}
                  {user.fitness_goal && <p><strong>Fitness Goal:</strong> {user.fitness_goal}</p>}
                  {user.diet_prefs && <p><strong>Diet Preferences:</strong> {user.diet_prefs}</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}