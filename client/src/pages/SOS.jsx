import { useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";

const SOS = () => {
  const [location, setLocation] = useState("");
  const [emergencyType, setEmergencyType] = useState("");
  const [description, setDescription] = useState("");

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(
          `${position.coords.latitude}, ${position.coords.longitude}`
        );
      },
      () => {
        alert("Unable to retrieve your location.");
      }
    );
  };

  const handleSOS = async (e) => {
    if (e) e.preventDefault();

    if (!emergencyType) {
      alert("Please select an emergency type.");
      return;
    }

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user?.user_id) {
      alert("Please login first.");
      return;
    }

    let latitude = null;
    let longitude = null;

    if (location) {
      const coords = location.split(",");

      latitude = parseFloat(coords[0]);
      longitude = parseFloat(coords[1]);
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/sos/create",
        {
          user_id: user.user_id,
          emergency_type: emergencyType,
          latitude,
          longitude,
          description,
        }
      );

      alert(res.data.message);

      setEmergencyType("");
      setDescription("");
      setLocation("");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to send SOS request"
      );
    }
  };

  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-red-600 dark:text-red-400">
            🚨 SOS Emergency Assistance
          </h1>

          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Request immediate help during emergencies.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-3xl mx-auto">

          {/* SOS Button */}
          <div className="flex justify-center mb-8">
            <button
              onClick={handleSOS}
              className="bg-red-600 hover:bg-red-700 text-white text-2xl font-bold rounded-full w-40 h-40 shadow-lg transition-transform hover:scale-105"
            >
              🆘 SOS
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSOS} className="space-y-6">

            {/* Emergency Type */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Emergency Type
              </label>

              <select
                value={emergencyType}
                onChange={(e) => setEmergencyType(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select Emergency</option>
                <option value="Medical Emergency">
                  🚑 Medical Emergency
                </option>
                <option value="Flood Rescue">
                  🌊 Flood Rescue
                </option>
                <option value="Fire Emergency">
                  🔥 Fire Emergency
                </option>
                <option value="Earthquake Assistance">
                  🌍 Earthquake Assistance
                </option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Current Location
              </label>

              <div className="flex gap-4">
                <input
                  type="text"
                  value={location}
                  readOnly
                  placeholder="Location not fetched"
                  className="flex-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg px-4 py-3"
                />

                <button
                  type="button"
                  onClick={getCurrentLocation}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
                >
                  📍 Get Location
                </button>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Additional Details
              </label>

              <textarea
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the emergency..."
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
            >
              Send SOS Request
            </button>

          </form>

          {/* Emergency Contacts */}
          <div className="mt-10 bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4">
              📞 Emergency Contacts
            </h2>

            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p>🚑 Ambulance: 108</p>
              <p>🚓 Police: 100</p>
              <p>🔥 Fire Brigade: 101</p>
              <p>🆘 National Disaster Helpline: 1078</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SOS;