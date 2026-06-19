import { Link } from "react-router-dom";
import NotificationBell from "./NotificationBell";

const Navbar = () => {
  return (
    <nav className="bg-red-600 dark:bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow-lg">

      <h1 className="text-2xl font-bold">
        🚨 Disaster Management
      </h1>

      <div className="space-x-6">
        <Link
          to="/"
          className="hover:text-gray-200 dark:hover:text-gray-300 transition"
        >
          Home
        </Link>

        <Link
          to="/login"
          className="hover:text-gray-200 dark:hover:text-gray-300 transition"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="hover:text-gray-200 dark:hover:text-gray-300 transition"
        >
          Register
        </Link>

        <Link
          to="/dashboard"
          className="hover:text-gray-200 dark:hover:text-gray-300 transition"
        >
          Dashboard
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <NotificationBell />
      </div>

    </nav>
  );
};

export default Navbar;