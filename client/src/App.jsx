//import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ← this imports Router
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Settings from "./pages/Settings.jsx";
import AdminDashboard from "./pages/adminDashboard.jsx"; // correct path

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
  );
}

export default App;

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/dashboard" element={<Dashboard />} /> 
//       <Route path="/settings" element={<Settings />} />    
//     </Routes>
//   );
// }

// export default App;

