import { useState } from "react";
import Sidebar from "../components/Sidebar";

const alertData = [
  {
    id: 1,
    type: "Flood Warning",
    location: "Patna, Bihar",
    severity: "High",
    time: "10 mins ago",
    description:
      "Heavy rainfall has increased river water levels. Residents are advised to move to safer locations.",
  },
  {
    id: 2,
    type: "Fire Alert",
    location: "Gaya, Bihar",
    severity: "Medium",
    time: "30 mins ago",
    description:
      "A fire incident has been reported. Emergency services have been dispatched.",
  },
  {
    id: 3,
    type: "Earthquake Advisory",
    location: "Muzaffarpur, Bihar",
    severity: "Low",
    time: "1 hour ago",
    description:
      "Minor seismic activity detected. Stay alert and follow safety guidelines.",
  },
  {
    id: 4,
    type: "Cyclone Alert",
    location: "Purnia, Bihar",
    severity: "High",
    time: "2 hours ago",
    description:
      "Strong winds and heavy rain expected. Avoid unnecessary travel.",
  },
];

const Alerts = () => {
  const [filter, setFilter] = useState("All");

  const filteredAlerts =
    filter === "All"
      ? alertData
      : alertData.filter((alert) =>
          alert.type.toLowerCase().includes(filter.toLowerCase())
        );

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "High":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      case "Medium":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Low":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-red-600 dark:text-red-400">
            📢 Disaster Alerts
          </h1>

          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Stay updated with the latest emergency notifications.
          </p>
        </div>

        {/* Filter */}
        <div className="mb-8">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="All">All Alerts</option>
            <option value="Flood">Flood</option>
            <option value="Fire">Fire</option>
            <option value="Earthquake">Earthquake</option>
            <option value="Cyclone">Cyclone</option>
          </select>
        </div>

        {/* Alert Cards */}
        <div className="space-y-6">
          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    🚨 {alert.type}
                  </h2>

                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    📍 {alert.location}
                  </p>

                  <p className="text-gray-500 dark:text-gray-400">
                    🕒 {alert.time}
                  </p>

                  <p className="mt-4 text-gray-700 dark:text-gray-200">
                    {alert.description}
                  </p>
                </div>

                <span
                  className={`px-4 py-2 rounded-full font-semibold ${getSeverityColor(
                    alert.severity
                  )}`}
                >
                  {alert.severity} Risk
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Notice */}
        <div className="mt-10 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-5 rounded-lg">
          <h3 className="font-bold text-red-700 dark:text-red-400">
            ⚠️ Important Notice
          </h3>

          <p className="text-gray-700 dark:text-gray-300 mt-2">
            Follow official instructions during emergencies and avoid spreading
            unverified information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Alerts;