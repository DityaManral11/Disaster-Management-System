import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import AlertList from "../components/AlertList";

const Dashboard = () => {
  const [stats, setStats] = useState({
    alerts: 0,
    shelters: 0,
    sos: 0,
    volunteers: 0,
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/dashboard/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Stats fetch error:", err));
  }, []);

  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            Welcome Back, User 👋
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

          <div className="bg-gray-200 dark:bg-gray-700 h-80 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-300">
              Map Integration Coming Next...
            </p>
          </div>
        </div>

        <AlertList />
      </div>
    </div>
  );
};

export default Dashboard;