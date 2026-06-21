import Sidebar from "../../components/Sidebar";
import { useState } from "react";

const ManageAlerts = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      title: "Flood Warning",
      location: "Noida",
      severity: "High",
      description: "Heavy rainfall may cause waterlogging in low-lying areas.",
      time: "10 mins ago",
    },
    {
      id: 2,
      title: "Fire Alert",
      location: "Ghaziabad",
      severity: "Medium",
      description: "Fire incident reported near industrial area.",
      time: "25 mins ago",
    },
    {
      id: 3,
      title: "Heatwave Advisory",
      location: "Delhi",
      severity: "Low",
      description: "Temperature expected to exceed 44°C today.",
      time: "1 hour ago",
    },
    {
      id: 4,
      title: "Storm Warning",
      location: "Gurugram",
      severity: "High",
      description: "Strong winds and thunderstorms expected tonight.",
      time: "2 hours ago",
    },
  ]);

  const createAlert = () => {
    const title = prompt("Enter Alert Title:");
    if (!title) return;

    const location = prompt("Enter Location:");
    if (!location) return;

    const severity = prompt(
      "Enter Severity (High / Medium / Low):"
    );

    const description = prompt("Enter Description:");

    const newAlert = {
      id: Date.now(),
      title,
      location,
      severity: severity || "Low",
      description: description || "No description provided.",
      time: "Just Now",
    };

    setAlerts([newAlert, ...alerts]);

    alert("Alert Created Successfully!");
  };

  const deleteAlert = (id) => {
    const confirmDelete = window.confirm(
      "Delete this alert?"
    );

    if (!confirmDelete) return;

    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">

        <div className="flex justify-between items-center mb-8 pr-24">
          <h1 className="text-4xl font-bold text-red-600 dark:text-red-400">
            📢 Manage Alerts
          </h1>

          <button
            onClick={createAlert}
            className="bg-red-600 text-white px-5 py-3 rounded-lg hover:bg-red-700 transition"
          >
            Create Alert
          </button>
        </div>

        <div className="space-y-6">

          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
            >
              <div className="flex justify-between items-start">

                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {alert.title}
                  </h2>

                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    📍 {alert.location}
                  </p>

                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    📝 {alert.description}
                  </p>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    ⏰ {alert.time}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-3">

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      alert.severity === "High"
                        ? "bg-red-100 text-red-700"
                        : alert.severity === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {alert.severity}
                  </span>

                  <button
                    onClick={() => deleteAlert(alert.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    Delete
                  </button>

                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default ManageAlerts;