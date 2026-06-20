import { useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";

const SOS = () => {
  const [location, setLocation] = useState("");
  const [emergencyType, setEmergencyType] = useState("");
  const [description, setDescription] = useState("");
  const [sending, setSending] = useState(false);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(`${position.coords.latitude}, ${position.coords.longitude}`);
      },
      (error) => {
        console.log("Location error:", error);

        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert("Location permission denied. Please allow location access or enter location manually.");
            break;
          case error.POSITION_UNAVAILABLE:
            alert("Location information unavailable. Please enter location manually.");
            break;
          case error.TIMEOUT:
            alert("Location request timed out. Please try again or enter location manually.");
            break;
          default:
            alert("Unable to retrieve your location. Please enter location manually.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  const handleSOS = async (e) => {
    if (e) e.preventDefault();

    if (!emergencyType) {
      alert("Please select an emergency type.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user?.user_id) {
      alert("Please login first.");
      return;
    }

    let latitude = null;
    let longitude = null;

    if (location.includes(",")) {
      const coords = location.split(",");
      latitude = parseFloat(coords[0]);
      longitude = parseFloat(coords[1]);
    }

    try {
      setSending(true);

      const res = await axios.post("http://localhost:5000/api/sos/create", {
        user_id: user.user_id,
        emergency_type: emergencyType,
        latitude,
        longitude,
        description: description || location,
      });

      alert(res.data.message || "SOS request sent successfully!");

      setEmergencyType("");
      setDescription("");
      setLocation("");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send SOS request");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-red-600 dark:text-red-400">
            🚨 SOS Emergency Assistance
          </h1>

          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Send an emergency request with your live location and details.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <div className="flex justify-center mb-8">
              <button
                onClick={handleSOS}
                disabled={sending}
                className="bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white text-3xl font-bold rounded-full w-44 h-44 shadow-xl transition-transform hover:scale-105"
              >
                {sending ? "Sending..." : "🆘 SOS"}
              </button>
            </div>

            <form onSubmit={handleSOS} className="space-y-6">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  Emergency Type
                </label>

                <select
                  value={emergencyType}
                  onChange={(e) => setEmergencyType(e.target.value)}
                  required
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Select Emergency</option>
                  <option value="Medical Emergency">🚑 Medical Emergency</option>
                  <option value="Flood Rescue">🌊 Flood Rescue</option>
                  <option value="Fire Emergency">🔥 Fire Emergency</option>
                  <option value="Earthquake Assistance">🌍 Earthquake Assistance</option>
                  <option value="Road Accident">🚧 Road Accident</option>
                  <option value="Evacuation Help">🏠 Evacuation Help</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  Current Location
                </label>

                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter location manually or click Get Location"
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

              <button
                type="submit"
                disabled={sending}
                className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white py-3 rounded-lg font-semibold transition"
              >
                {sending ? "Sending SOS..." : "Send SOS Request"}
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 rounded-xl">
              <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4">
                📞 Emergency Contacts
              </h2>

              <div className="space-y-3">
                <a href="tel:108" className="block text-gray-700 dark:text-gray-300">
                  🚑 Ambulance: 108
                </a>

                <a href="tel:112" className="block text-gray-700 dark:text-gray-300">
                  🚓 Police Emergency: 112
                </a>

                <a href="tel:101" className="block text-gray-700 dark:text-gray-300">
                  🔥 Fire Brigade: 101
                </a>

                <a href="tel:1078" className="block text-gray-700 dark:text-gray-300">
                  🆘 Disaster Helpline: 1078
                </a>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                ✅ SOS Checklist
              </h2>

              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li>✔ Select emergency type</li>
                <li>✔ Fetch or enter your current location</li>
                <li>✔ Add short emergency details</li>
                <li>✔ Stay reachable after sending SOS</li>
              </ul>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-6 rounded-xl">
              <h2 className="text-xl font-bold text-yellow-700 dark:text-yellow-400 mb-2">
                ⚠️ Important
              </h2>

              <p className="text-gray-700 dark:text-gray-300">
                Use SOS only for real emergencies. If live location fails, enter
                your location manually before sending the request.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SOS;