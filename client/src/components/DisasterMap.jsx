import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Sample Data
const disasterLocations = [
  {
    id: 1,
    position: [25.5941, 85.1376], // Patna
    type: "Flood Warning",
    severity: "High",
  },
  {
    id: 2,
    position: [26.8467, 80.9462], // Lucknow
    type: "Heavy Rainfall",
    severity: "Medium",
  },
];

const shelters = [
  {
    id: 1,
    position: [25.6041, 85.1476],
    name: "Patna Relief Camp",
  },
  {
    id: 2,
    position: [26.8567, 80.9562],
    name: "Lucknow Shelter",
  },
];

const DisasterMap = () => {
  return (
    <MapContainer
      center={[25.5941, 85.1376]}
      zoom={6}
      style={{ height: "500px", width: "100%" }}
      className="rounded-xl"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Disaster Markers */}
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
                Severity: {disaster.severity}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Shelter Markers */}
      {shelters.map((shelter) => (
        <Marker
          key={shelter.id}
          position={shelter.position}
        >
          <Popup>
            <div>
              <h3 className="font-bold">
                🏠 {shelter.name}
              </h3>

              <p>
                Emergency Shelter Available
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default DisasterMap;