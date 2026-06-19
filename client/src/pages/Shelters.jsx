import Sidebar from "../components/Sidebar";

const shelters = [
  {
    id: 1,
    name: "Patna Relief Camp",
    location: "Patna, Bihar",
    capacity: 200,
    available: 85,
    contact: "+91 9876543210",
  },
  {
    id: 2,
    name: "Nalanda Emergency Shelter",
    location: "Nalanda, Bihar",
    capacity: 150,
    available: 60,
    contact: "+91 9876543211",
  },
  {
    id: 3,
    name: "Gaya Disaster Relief Center",
    location: "Gaya, Bihar",
    capacity: 300,
    available: 120,
    contact: "+91 9876543212",
  },
  {
    id: 4,
    name: "Muzaffarpur Safe Zone",
    location: "Muzaffarpur, Bihar",
    capacity: 250,
    available: 45,
    contact: "+91 9876543213",
  },
];

const Shelters = () => {
  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-red-600 dark:text-red-400">
            🏠 Shelter Locator
          </h1>

          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Find nearby emergency shelters and check availability.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="🔍 Search by city or shelter name..."
            className="w-full max-w-lg px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Shelter Cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {shelters.map((shelter) => (
            <div
              key={shelter.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  {shelter.name}
                </h2>

                <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-sm">
                  Available
                </span>
              </div>

              <div className="space-y-3 text-gray-600 dark:text-gray-300">
                <p>📍 {shelter.location}</p>

                <p>
                  👥 Capacity: {shelter.capacity}
                </p>

                <p>
                  🛏️ Available Beds: {shelter.available}
                </p>

                <p>
                  📞 Contact: {shelter.contact}
                </p>
              </div>

              <div className="mt-6 flex gap-3">
                <button className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition">
                  View on Map
                </button>

                <button className="flex-1 border border-red-600 text-red-600 dark:text-red-400 dark:border-red-400 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition">
                  Get Directions
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Notice */}
        <div className="mt-10 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-5 rounded-lg">
          <h3 className="font-bold text-yellow-700 dark:text-yellow-400">
            ⚠️ Emergency Notice
          </h3>

          <p className="text-gray-700 dark:text-gray-300 mt-2">
            Shelter availability updates every 15 minutes.
            Please contact the shelter before arrival.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Shelters;