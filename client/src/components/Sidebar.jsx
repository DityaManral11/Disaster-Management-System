import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  let navItems = [];

  // Admin Sidebar
  if (user?.role === "admin") {
    navItems = [
      { path: "/admin", label: "⚙️ Admin Dashboard" },
      { path: "/alerts", label: "📢 Manage Alerts" },
      { path: "/shelters", label: "🏕️ Manage Shelters" },
      { path: "/volunteers", label: "🤝 Manage Volunteers" },
      { path: "/map", label: "🗺️ Live Map" },
    ];
  }

  // Volunteer Sidebar
  else if (user?.role === "volunteer") {
    navItems = [
      { path: "/volunteer-dashboard", label: "🤝 Volunteer Dashboard" },
      { path: "/volunteer-tasks", label: "📋 My Tasks" },
      { path: "/volunteer-profile", label: "👤 Volunteer Profile" },
      { path: "/map", label: "🗺️ Live Map" },
    ];
  }

  // Citizen Sidebar
  else {
    navItems = [
      { path: "/", label: "🏠 Home" },
      { path: "/dashboard", label: "📊 Dashboard" },
      { path: "/alerts", label: "📢 Alerts" },
      { path: "/shelters", label: "🏕️ Shelters" },
      { path: "/volunteers", label: "🤝 Volunteers" },
      { path: "/profile", label: "👤 Profile" },
      { path: "/map", label: "🗺️ Live Map" },
      { path: "/sos", label: "🆘 SOS" },
    ];
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="w-64 min-h-screen bg-red-600 dark:bg-gray-800 text-white p-6 flex flex-col">

      <h1 className="text-2xl font-bold mb-10">
        🚨 Disaster Management
      </h1>

      <nav className="flex flex-col gap-2 flex-grow">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `block p-3 rounded-lg transition duration-200 ${
                isActive
                  ? "bg-red-800 dark:bg-gray-700 font-semibold"
                  : "hover:bg-red-700 dark:hover:bg-gray-700"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-8 block p-3 rounded-lg bg-red-700 hover:bg-red-800 dark:bg-gray-700 dark:hover:bg-gray-600 transition text-center font-semibold"
      >
        🚪 Logout
      </button>

    </div>
  );
};

export default Sidebar;