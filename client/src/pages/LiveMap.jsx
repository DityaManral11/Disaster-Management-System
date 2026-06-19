import Sidebar from "../components/Sidebar";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const disasterLocations = [
  {
    id: 1,
    type: "Flood",
    location: "Patna, Bihar",
    position: [25.5941, 85.1376],
  },
  {
    id: 2,
    type: "Fire",
    location: "Gaya, Bihar",
    position: [24.7914, 85.0002],
  },
  {
    id: 3,
    type: "Earthquake",
    location: "Muzaffarpur, Bihar",
    position: [26.1209, 85.3647],
  },
];

const LiveMap = () => {
  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-red-600 dark:text-red-400">
            🌍 Live Disaster Map
          </h1>

          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Monitor disaster-affected areas and emergency locations in real time.
          </p>
        </div>

        {/* Map Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">

          <MapContainer
            center={[25.5941, 85.1376]}
            zoom={7}
            scrollWheelZoom={true}
            className="h-[600px] w-full rounded-lg z-0"
          >
            {/* Light Mode Map */}
            {!document.documentElement.classList.contains("dark") ? (
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            ) : (
              /* Dark Mode Map */
              <TileLayer
                attribution='&copy; OpenStreetMap contributors &copy; CARTO'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />
            )}

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

                    <p>
                      📍 {disaster.location}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

        </div>

        {/* Legend */}
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