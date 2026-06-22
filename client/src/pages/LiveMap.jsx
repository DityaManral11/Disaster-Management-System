import Sidebar from "../components/Sidebar";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";

// Fix Leaflet marker icons on Render/Production
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const disasterLocations = [
  {
    id: 1,
    type: "Flood Alert",
    location: "Delhi, India",
    position: [28.6139, 77.2090],
  },
  {
    id: 2,
    type: "Fire Alert",
    location: "Noida, Uttar Pradesh",
    position: [28.5355, 77.3910],
  },
  {
    id: 3,
    type: "Earthquake Alert",
    location: "Gurugram, Haryana",
    position: [28.4595, 77.0266],
  },
  {
    id: 4,
    type: "Medical Emergency",
    location: "Faridabad, Haryana",
    position: [28.4090, 77.3178],
  },
];

const LiveMap = () => {
  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-red-600 dark:text-red-400">
            🌍 Live Disaster Map
          </h1>

          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Monitor disaster-affected areas and emergency locations in real
            time.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <MapContainer
            center={[28.55, 77.25]}
            zoom={10}
            scrollWheelZoom={true}
            className="h-[600px] w-full rounded-lg"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {disasterLocations.map((disaster) => (
              <Marker
                key={disaster.id}
                position={disaster.position}
              >
                <Popup>
                  <div>
                    <h3 className="font-bold">
                      🚨 {disaster.type}
                    </h3>

                    <p>📍 {disaster.location}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            📌 Map Legend
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌊</span>
              <p className="text-gray-700 dark:text-gray-300">
                Flood Areas
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl">🔥</span>
              <p className="text-gray-700 dark:text-gray-300">
                Fire Emergencies
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl">🌍</span>
              <p className="text-gray-700 dark:text-gray-300">
                Earthquake Zones
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMap;