import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

const ManageSOS = () => {
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

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/sos/status/${id}`,
        { status }
      );

      setSosRequests((prev) =>
        prev.map((item) =>
          item.sos_id === id
            ? { ...item, status }
            : item
        )
      );
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    }
  };

  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-red-600 dark:text-red-400 mb-8">
          🆘 Manage SOS Requests
        </h1>

        <div className="space-y-4">
          {sosRequests.map((request) => (
            <div
              key={request.sos_id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-bold text-xl text-gray-800 dark:text-white">
                    {request.full_name}
                  </h2>

                  <p className="text-gray-600 dark:text-gray-300">
                    🚨 {request.emergency_type}
                  </p>

                  <p className="text-gray-500 dark:text-gray-400">
                    📞 {request.phone}
                  </p>

                  <p className="text-gray-500 dark:text-gray-400">
                    📝 {request.description}
                  </p>

                  {request.latitude && request.longitude && (
                    <button
                      onClick={() =>
                        window.open(
                          `https://www.google.com/maps?q=${request.latitude},${request.longitude}`,
                          "_blank"
                        )
                      }
                      className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                      📍 View Location
                    </button>
                  )}
                </div>

                <div>
                  <select
                    value={request.status}
                    onChange={(e) =>
                      updateStatus(
                        request.sos_id,
                        e.target.value
                      )
                    }
                    className="bg-gray-200 dark:bg-gray-700 dark:text-white px-3 py-2 rounded-lg"
                  >
                    <option value="Pending">
                      Pending
                    </option>

                    <option value="In Progress">
                      In Progress
                    </option>

                    <option value="Resolved">
                      Resolved
                    </option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageSOS;