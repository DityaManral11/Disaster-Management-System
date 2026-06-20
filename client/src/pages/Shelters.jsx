import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const Shelters = () => {
  const [shelters, setShelters] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/shelters")
      .then((res) => res.json())
      .then((data) => setShelters(data))
      .catch((err) => console.error("Shelters fetch error:", err));
  }, []);

  const getStatus = (available, capacity) => {
    const percentage = (available / capacity) * 100;

    if (available === 0) {
      return {
        text: "Full",
        style: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
        bar: "bg-red-500",
      };
    }

    if (percentage <= 25) {
      return {
        text: "Almost Full",
        style:
          "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
        bar: "bg-yellow-500",
      };
    }

    return {
      text: "Available",
      style:
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      bar: "bg-green-500",
    };
  };

  const openMap = (shelter) => {
    const query = `${shelter.location}`;
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        query
      )}`,
      "_blank"
    );
  };

  const openDirections = (shelter) => {
    const destination = `${shelter.location}`;
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
        destination
      )}`,
      "_blank"
    );
  };

  const filteredShelters = shelters.filter(
    (shelter) =>
      shelter.name.toLowerCase().includes(search.toLowerCase()) ||
      shelter.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-red-600 dark:text-red-400">
            🏠 Shelter Locator
          </h1>

          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Find nearby emergency shelters and check live availability.
          </p>
        </div>

        <div className="mb-8">
          <input
            type="text"
            placeholder="🔍 Search by city or shelter name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-lg px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredShelters.map((shelter) => {
            const status = getStatus(shelter.available, shelter.capacity);
            const availabilityPercent = Math.round(
              (shelter.available / shelter.capacity) * 100
            );

            return (
              <div
                key={shelter.shelter_id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300"
              >
                <div className="flex justify-between items-start gap-4 mb-4">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                    {shelter.name}
                  </h2>

                  <span
                    className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${status.style}`}
                  >
                    {status.text}
                  </span>
                </div>

                <div className="space-y-3 text-gray-600 dark:text-gray-300">
                  <p>📍 {shelter.location}</p>
                  <p>👥 Capacity: {shelter.capacity}</p>
                  <p>✅ Available Beds: {shelter.available}</p>
                  <p>📞 Contact: {shelter.contact}</p>
                  <p>📝 {shelter.description}</p>
                </div>

                <div className="mt-5">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-300">
                      Availability
                    </span>
                    <span className="font-semibold text-gray-700 dark:text-gray-200">
                      {availabilityPercent}%
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className={`${status.bar} h-3 rounded-full`}
                      style={{ width: `${availabilityPercent}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => openMap(shelter)}
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    View on Map
                  </button>

                  <button
                    onClick={() => openDirections(shelter)}
                    className="flex-1 border border-red-600 text-red-600 dark:text-red-400 dark:border-red-400 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                  >
                    Get Directions
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredShelters.length === 0 && (
          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              No shelters found.
            </p>
          </div>
        )}

        <div className="mt-10 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-5 rounded-lg">
          <h3 className="font-bold text-yellow-700 dark:text-yellow-400">
            ⚠️ Emergency Notice
          </h3>

          <p className="text-gray-700 dark:text-gray-300 mt-2">
            Shelter availability is fetched from the database. Please contact
            the shelter before arrival.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Shelters;