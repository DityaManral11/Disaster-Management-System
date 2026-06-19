import { useState } from "react";

const notifications = [
  {
    id: 1,
    title: "Flood Alert",
    message: "Heavy rainfall expected in Patna.",
    time: "2 mins ago",
  },
  {
    id: 2,
    title: "SOS Request",
    message: "New SOS request received from Gaya.",
    time: "10 mins ago",
  },
  {
    id: 3,
    title: "Shelter Update",
    message: "Patna Relief Camp reached 80% capacity.",
    time: "30 mins ago",
  },
];

function NotificationBell() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative text-2xl"
      >
        🔔

        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
          {notifications.length}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl z-50">
          <div className="p-4 border-b dark:border-gray-700">
            <h3 className="font-bold text-lg dark:text-white">
              Notifications
            </h3>
          </div>

          {notifications.map((item) => (
            <div
              key={item.id}
              className="p-4 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <h4 className="font-semibold dark:text-white">
                {item.title}
              </h4>

              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {item.message}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                {item.time}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NotificationBell;