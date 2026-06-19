import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const navItems = [
    { path: "/", label: "🏠 Home" },
    { path: "/dashboard", label: "📊 Dashboard" },
    { path: "/alerts", label: "📢 Alerts" },
    { path: "/shelters", label: "🏕️ Shelters" },
    { path: "/volunteers", label: "🤝 Volunteers" },
    { path: "/profile", label: "👤 Profile" },
    { path: "/map", label: "🗺️ Live Map" },
    { path: "/sos", label: "🆘 SOS" },
    { path: "/admin", label: "⚙️ Admin Dashboard" },
  ];

  return (
    <div className="w-64 min-h-screen bg-red-600 dark:bg-gray-800 text-white p-6 flex flex-col">
      
      {/* Logo */}
      <h1 className="text-2xl font-bold mb-10">
        🚨 Disaster Management
      </h1>

      {/* Navigation */}
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

      {/* Logout */}
      <NavLink
        to="/login"
        className="mt-8 block p-3 rounded-lg bg-red-700 hover:bg-red-800 dark:bg-gray-700 dark:hover:bg-gray-600 transition text-center font-semibold"
      >
        🚪 Logout
      </NavLink>
    </div>
  );
};

export default Sidebar;