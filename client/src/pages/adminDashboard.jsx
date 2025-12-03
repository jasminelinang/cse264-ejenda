// //import React, { useEffect, useState } from "react";
// import "./adminDashboard.css";

// const API_BASE = "http://localhost:3000"; // backend

// export default function AdminDashboard() {
//   const [users, setUsers] = useState([]);
//   const [expandedUser, setExpandedUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadUsers();
//   }, []);

//   async function loadUsers() {
//     try {
//       const res = await fetch(`${API_BASE}/api/admin/users`); // ✅ corrected path
//       if (!res.ok) throw new Error("Failed to fetch users");
//       const data = await res.json();
//       setUsers(data);
//     } catch (err) {
//       console.error(err);
//       setUsers([]);
//     } finally {
//       setLoading(false);
//     }
//   }

//   function toggleUser(id) {
//     setExpandedUser((prev) => (prev === id ? null : id));
//   }

//   async function deleteUser(id) {
//     const confirmDelete = window.confirm("Delete this user?");
//     if (!confirmDelete) return;

//     try {
//       const res = await fetch(`${API_BASE}/api/admin/users/${id}`, { method: "DELETE" });
//       if (!res.ok) throw new Error("Delete failed");
//       setUsers((prev) => prev.filter((u) => u.id !== id));
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete user");
//     }
//   }

//   function inspectCalendar(id) {
//     alert(`Inspect calendar for user ID: ${id}`);
//     // Or navigate to a page: navigate(`/calendar/${id}`)
//   }

//   if (loading) return <div className="admin-loading">Loading users...</div>;

//   return (
//     <div className="admin-dashboard">
//       <h1>Admin Dashboard</h1>
//       <p className="admin-subtitle">Manage all registered users</p>

//       <div className="admin-user-list">
//         {users.length === 0 && <p>No users found.</p>}

//         {users.map((user) => (
//           <div key={user.id} className="admin-user-card">
//             <div className="admin-user-header">
//               <div>
//                 <strong>{user.name}</strong>  
//                 <span className="admin-email"> ({user.email})</span>
//               </div>

//               <div className="admin-btn-group">
//                 <button onClick={() => toggleUser(user.id)} className="admin-toggle-btn">
//                   {expandedUser === user.id ? "▲" : "▼"}
//                 </button>
//                 <button onClick={() => inspectCalendar(user.id)} className="admin-inspect-btn">
//                   Inspect Calendar
//                 </button>
//                 <button onClick={() => deleteUser(user.id)} className="admin-delete-btn">
//                   Delete
//                 </button>
//               </div>
//             </div>

//             {expandedUser === user.id && (
//               <div className="admin-user-details">
//                 <p><strong>User ID:</strong> {user.id}</p>
//                 <p><strong>Email:</strong> {user.email}</p>
//                 <p><strong>Role:</strong> {user.role}</p>
//                 <p><strong>Height:</strong> {user.height ?? "N/A"}</p>
//                 <p><strong>Weight:</strong> {user.weight ?? "N/A"}</p>
//                 <p><strong>Fitness Goal:</strong> {user.fitness_goal ?? "N/A"}</p>
//                 <p><strong>Diet Preferences:</strong> {user.diet_prefs ?? "N/A"}</p>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import "./adminDashboard.css";

const API_BASE = "http://localhost:3000"; // backend URL

export default function AdminDashboard() {
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

    try {
      const res = await fetch(`${API_BASE}/api/admin/users`, {
        credentials: "include", // 👈 send cookies if using session auth
        // headers: { Authorization: `Bearer ${token}` }, // 👈 use if JWT
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to fetch users");
      }

      const data = await res.json();

      if (!Array.isArray(data)) {
        throw new Error("Unexpected data format from server");
      }

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
    setExpandedUser((prev) => (prev === id ? null : id));
  }

  // Delete a user
  async function deleteUser(id) {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`${API_BASE}/api/admin/users/${id}`, {
        method: "DELETE",
        credentials: "include",
        // headers: { Authorization: `Bearer ${token}` }, // JWT if used
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to delete user");
      }

      // Remove user from state
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete user: " + err.message);
    }
  }

  // Inspect a user's calendar
  async function inspectCalendar(id) {
    try {
      const res = await fetch(`${API_BASE}/api/admin/calendar/${id}`, {
        credentials: "include",
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to fetch calendar");
      }

      const data = await res.json();
      console.log(`Calendar for user ${id}:`, data);
      alert(`User ${id}'s calendar events logged to console.`);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch calendar: " + err.message);
    }
  }

  if (loading) return <div className="admin-loading">Loading users...</div>;
  if (error) return <div className="admin-error">Error: {error}</div>;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p className="admin-subtitle">Manage all registered users</p>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="admin-user-list">
          {users.map((user) => (
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
                  <button onClick={() => inspectCalendar(user.id)}>Calendar</button>
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
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}