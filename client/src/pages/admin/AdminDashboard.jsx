import Sidebar from "../../components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";




const alerts = [
  {
    id: 1,
    type: "Flood Warning",
    area: "North Bihar",
    severity: "High",
  },
  {
    id: 2,
    type: "Heavy Rainfall",
    area: "Patna",
    severity: "Medium",
  },
];

const AdminDashboard = () => {
  const [sosRequests, setSosRequests] = useState([]);

  useEffect(() => {
    fetchSOS();
  }, []);

  const fetchSOS = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/sos/all"
      );

      setSosRequests(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-red-600 dark:text-red-400">
            ⚙️ Admin Dashboard
          </h1>

          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Monitor emergencies, manage resources, and coordinate disaster response.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-gray-500 dark:text-gray-400">
              Active Alerts
            </h3>

            <p className="text-4xl font-bold text-red-600 dark:text-red-400 mt-2">
              12
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-gray-500 dark:text-gray-400">
              SOS Requests
            </h3>

            <p className="text-4xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">
              {sosRequests.length}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-gray-500 dark:text-gray-400">
              Active Volunteers
            </h3>

            <p className="text-4xl font-bold text-green-600 dark:text-green-400 mt-2">
              150
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-gray-500 dark:text-gray-400">
              Available Shelters
            </h3>

            <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mt-2">
              28
            </p>
          </div>

        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* SOS Requests */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                🆘 SOS Requests
              </h2>

              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                View All
              </button>
            </div>

            <div className="space-y-4">

              {sosRequests.length === 0 ? (<p className="text-gray-500 dark:text-gray-400">
                No SOS Requests Found </p>
              ) : (
                sosRequests.map((request) => (<div
                  key={request.sos_id}
                  className="border dark:border-gray-700 rounded-lg p-4"
                > <div className="flex justify-between items-start">

                    
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
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${request.status === "Pending"
                          ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                          : request.status === "In Progress"
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                            : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                        }`}
                    >
                      {request.status}
                    </span>

                  </div>
                </div>
                ))


              )}

            </div>


          </div>

          {/* Alert Management */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                📢 Active Alerts
              </h2>

              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
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
                      className={`px-3 py-1 rounded-full text-sm ${alert.severity === "High"
                        ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                        : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                        }`}
                    >
                      {alert.severity}
                    </span>

                  </div>
                </div>
              ))}

            </div>

          </div>

        </div>

        {/* Quick Actions */}
        <div className="mt-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            ⚡ Quick Actions
          </h2>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">

            <button className="bg-red-600 text-white p-4 rounded-lg hover:bg-red-700 transition">
              🚨 Issue Alert
            </button>

            <button className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition">
              🏠 Manage Shelters
            </button>

            <button className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition">
              🤝 Manage Volunteers
            </button>

            <button className="bg-yellow-600 text-white p-4 rounded-lg hover:bg-yellow-700 transition">
              📊 View Reports
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;