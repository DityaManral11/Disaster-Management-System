import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import VolunteerDashboard from "./pages/volunteer/VolunteerDashboard";
import VolunteerTasks from "./pages/volunteer/VolunteerTasks";
import VolunteerProfile from "./pages/volunteer/VolunteerProfile";
import AdminDashboard from "./pages/admin/AdminDashboard";
import LiveMap from "./pages/LiveMap";
import SOS from "./pages/SOS";
import Shelters from "./pages/Shelters";
import Alerts from "./pages/Alerts";
import Volunteers from "./pages/Volunteers";
import Profile from "./pages/Profile";
import AdminLogin from "./pages/admin/AdminLogin";
import ManageAlerts from "./pages/admin/ManageAlerts";
import ManageResources from "./pages/admin/ManageResources";
import ManageShelters from "./pages/admin/ManageShelters";
import ManageVolunteers from "./pages/admin/ManageVolunteers";
import ManageSOS from "./pages/admin/ManageSOS";
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

  return (
    <BrowserRouter>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed bottom-6 right-6 z-50 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-white shadow-md"
      >
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/volunteer-dashboard"
          element={
            <ProtectedRoute>
              <VolunteerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/volunteer-tasks"
          element={
            <ProtectedRoute>
              <VolunteerTasks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/volunteer-profile"
          element={
            <ProtectedRoute>
              <VolunteerProfile />
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
        <Route
          path="/manage-alerts"
          element={
            <ProtectedRoute>
              <ManageAlerts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manage-resources"
          element={
            <ProtectedRoute>
              <ManageResources />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manage-shelters"
          element={
            <ProtectedRoute>
              <ManageShelters />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manage-volunteers"
          element={
            <ProtectedRoute>
              <ManageVolunteers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manage-sos"
          element={<ManageSOS />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;