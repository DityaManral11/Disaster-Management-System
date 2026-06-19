import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import AlertList from "../components/AlertList";

const Dashboard = () => {
  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-8">

        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            Welcome Back, User 👋
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Stay informed and stay safe.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          <StatCard
            title="Active Alerts"
            count="12"
            icon="🚨"
          />

          <StatCard
            title="Available Shelters"
            count="28"
            icon="🏠"
          />

          <StatCard
            title="SOS Requests"
            count="5"
            icon="🆘"
          />

          <StatCard
            title="Volunteers"
            count="150"
            icon="🤝"
          />

        </div>

        {/* Map Preview */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">

          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            🗺️ Live Disaster Map
          </h2>

          <div className="bg-gray-200 dark:bg-gray-700 h-80 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-300">
              Map Integration Coming Next...
            </p>
          </div>

        </div>

        {/* Alerts */}
        <AlertList />

      </div>

    </div>
  );
};

export default Dashboard;