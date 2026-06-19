import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import LiveMap from "./pages/LiveMap";
import SOS from "./pages/SOS";
import Shelters from "./pages/Shelters";
import Alerts from "./pages/Alerts";
import Volunteers from "./pages/Volunteers";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/admin/AdminDashboard";

// Protected Route
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
const [darkMode, setDarkMode] = useState(
localStorage.getItem("theme") === "dark"
);

useEffect(() => {
if (darkMode) {
document.documentElement.classList.add("dark");
localStorage.setItem("theme", "dark");
} else {
document.documentElement.classList.remove("dark");
localStorage.setItem("theme", "light");
}
}, [darkMode]);

return ( <BrowserRouter>


  {/* Dark Mode Toggle */}
  <button
    onClick={() => setDarkMode(!darkMode)}
    className="fixed top-4 right-4 z-50 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-white shadow-md"
  >
    {darkMode ? "☀️ Light" : "🌙 Dark"}
  </button>

  <Routes>

    {/* Public Routes */}
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* Protected Routes */}
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />

    <Route
      path="/profile"
      element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      }
    />

    <Route
      path="/sos"
      element={
        <ProtectedRoute>
          <SOS />
        </ProtectedRoute>
      }
    />

    <Route
      path="/shelters"
      element={
        <ProtectedRoute>
          <Shelters />
        </ProtectedRoute>
      }
    />

    <Route
      path="/volunteers"
      element={
        <ProtectedRoute>
          <Volunteers />
        </ProtectedRoute>
      }
    />

    <Route
      path="/map"
      element={
        <ProtectedRoute>
          <LiveMap />
        </ProtectedRoute>
      }
    />

    <Route
      path="/alerts"
      element={
        <ProtectedRoute>
          <Alerts />
        </ProtectedRoute>
      }
    />

    <Route
      path="/admin"
      element={
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      }
    />

  </Routes>

</BrowserRouter>


);
}

export default App;
