import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import AlertList from "../components/AlertList";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const savedUser = JSON.parse(localStorage.getItem("user"));
  const [stats, setStats] = useState({
    alerts: 0,
    shelters: 0,
    sos: 0,
    volunteers: 0,
  });

  useEffect(() => {
    fetch("https://disaster-management-system-vij2.onrender.com/api/dashboard/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Stats fetch error:", err));
  }, []);

  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">
            Welcome Back, {savedUser?.full_name || "User"} 👋
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Stay informed and stay safe.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Active Alerts" count={stats.alerts} icon="🚨" />
          <StatCard title="Available Shelters" count={stats.shelters} icon="🏠" />
          <StatCard title="SOS Requests" count={stats.sos} icon="🆘" />
          <StatCard title="Volunteers" count={stats.volunteers} icon="🤝" />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            🗺️ Live Disaster Map
          </h2>

          <div className="bg-gray-200 dark:bg-gray-700 h-80 rounded-lg flex flex-col items-center justify-center gap-4">
            <p className="text-gray-500 dark:text-gray-300">
              Live map is available on a separate page for better performance.
            </p>
            <button
            type="button"
              onClick={() => navigate("/map")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-300 shadow-md hover:shadow-xl"
            >
              🗺️ View Live Map
            </button>
          </div>
        </div>

        <AlertList />
      </div>
    </div>
  );
};

export default Dashboard;