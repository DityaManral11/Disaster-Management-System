import Navbar from "../components/Navbar";
import FeatureCard from "../components/FeatureCard";

const Home = () => {
  return (
    <>
      <Navbar />

      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">

        {/* Hero Section */}
        <section className="text-center py-20 bg-red-50 dark:bg-gray-800">
          <h1 className="text-5xl font-bold text-red-600 dark:text-red-400 mb-6">
            Disaster Management & Emergency Response
          </h1>

          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Stay informed, report emergencies, find shelters,
            and coordinate disaster response efficiently.
          </p>

          <button className="mt-8 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition">
            Get Started
          </button>
        </section>

        {/* Features */}
        <section className="py-16 px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            Key Features
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon="🚨"
              title="SOS Emergency"
              description="Send emergency requests instantly."
            />

            <FeatureCard
              icon="🗺️"
              title="Live Disaster Map"
              description="View affected areas in real time."
            />

            <FeatureCard
              icon="🏠"
              title="Shelter Locator"
              description="Find nearby shelters quickly."
            />

            <FeatureCard
              icon="📢"
              title="Alerts"
              description="Receive disaster notifications."
            />
          </div>
        </section>

        {/* Alerts */}
        <section className="px-8 pb-16">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
            Recent Alerts
          </h2>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <p className="text-red-600 dark:text-red-400 font-semibold">
              ⚠️ Flood Warning issued for North Bihar.
            </p>

            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Updated: 10 mins ago
            </p>
          </div>
        </section>

      </div>
    </>
  );
};

export default Home;