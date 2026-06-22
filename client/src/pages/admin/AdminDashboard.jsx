import Sidebar from "../../components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const alerts = [
  { id: 1, type: "Flood Warning", area: "Noida, Uttar Pradesh", severity: "High" },
  { id: 2, type: "Fire Alert", area: "Ghaziabad, Uttar Pradesh", severity: "Medium" },
  { id: 3, type: "Earthquake Advisory", area: "Gurugram, Haryana", severity: "Low" },
  { id: 4, type: "Medical Emergency", area: "Faridabad, Haryana", severity: "High" },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [sosRequests, setSosRequests] = useState([]);

  useEffect(() => {
    fetchSOS();
  }, []);

  const fetchSOS = async () => {
    try {
      const res = await axios.get("https://disaster-management-system-vij2.onrender.com/api/sos/all");
      setSosRequests(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateSOSStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/sos/status/${id}`, {
        status,
      });

      setSosRequests((prev) =>
        prev.map((item) =>
          item.sos_id === id ? { ...item, status } : item
        )
      );
    } catch (error) {
      console.error(error);
      alert("Failed to update SOS status");
    }
  };

  const getSeverityColor = (severity) => {
    if (severity === "High") {
      return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    }
    if (severity === "Medium") {
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
    }
    return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
  };

  const getStatusColor = (status) => {
    if (status === "Pending") {
      return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400";
    }
    if (status === "In Progress") {
      return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400";
    }
    return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400";
  };

  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-red-600 dark:text-red-400">
            ⚙️ Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Monitor emergencies, manage resources, and coordinate disaster response.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-gray-500 dark:text-gray-400">Active Alerts</h3>
            <p className="text-4xl font-bold text-red-600 dark:text-red-400 mt-2">
              {alerts.length}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-gray-500 dark:text-gray-400">SOS Requests</h3>
            <p className="text-4xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">
              {sosRequests.length}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-gray-500 dark:text-gray-400">Active Volunteers</h3>
            <p className="text-4xl font-bold text-green-600 dark:text-green-400 mt-2">
              6
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-gray-500 dark:text-gray-400">Available Shelters</h3>
            <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mt-2">
              8
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                🆘 SOS Requests
              </h2>

              <button
                onClick={() => navigate("/manage-sos")}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                View All
              </button>
            </div>

            <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">
              {sosRequests.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">
                  No SOS Requests Found
                </p>
              ) : (
                sosRequests.map((request) => (
                  <div
                    key={request.sos_id}
                    className="border dark:border-gray-700 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="font-bold text-gray-800 dark:text-white">
                          {request.full_name}
                        </h3>

                        <p className="text-gray-600 dark:text-gray-300">
                          🚨 {request.emergency_type}
                        </p>

                        <p className="text-gray-500 dark:text-gray-400">
                          📝 {request.description || "No description provided"}
                        </p>

                        {request.latitude && request.longitude && (
                          <button
                            onClick={() =>
                              window.open(
                                `https://www.google.com/maps?q=${request.latitude},${request.longitude}`,
                                "_blank"
                              )
                            }
                            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                          >
                            📍 View Location
                          </button>
                        )}

                        <div className="mt-3 flex flex-wrap gap-2">
                          <button
                            onClick={() =>
                              updateSOSStatus(request.sos_id, "In Progress")
                            }
                            className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition"
                          >
                            Start
                          </button>

                          <button
                            onClick={() =>
                              updateSOSStatus(request.sos_id, "Resolved")
                            }
                            className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition"
                          >
                            Resolve
                          </button>

                          <button
                            onClick={() =>
                              updateSOSStatus(request.sos_id, "Pending")
                            }
                            className="bg-yellow-600 text-white px-3 py-2 rounded-lg hover:bg-yellow-700 transition"
                          >
                            Pending
                          </button>
                        </div>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${getStatusColor(
                          request.status
                        )}`}
                      >
                        {request.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                📢 Active Alerts
              </h2>

              <button
                onClick={() => navigate("/manage-alerts")}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Create Alert
              </button>
            </div>

            <div className="space-y-4">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="border dark:border-gray-700 rounded-lg p-4"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-gray-800 dark:text-white">
                        {alert.type}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-300">
                        📍 {alert.area}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getSeverityColor(
                        alert.severity
                      )}`}
                    >
                      {alert.severity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            ⚡ Quick Actions
          </h2>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            <button
              onClick={() => navigate("/manage-alerts")}
              className="bg-red-600 text-white p-4 rounded-lg hover:bg-red-700 transition"
            >
              🚨 Issue Alert
            </button>

            <button
              onClick={() => navigate("/manage-shelters")}
              className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition"
            >
              🏠 Manage Shelters
            </button>

            <button
              onClick={() => navigate("/manage-volunteers")}
              className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition"
            >
              🤝 Manage Volunteers
            </button>

            <button
              onClick={() => navigate("/manage-resources")}
              className="bg-yellow-600 text-white p-4 rounded-lg hover:bg-yellow-700 transition"
            >
              📊 Manage Resources
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;