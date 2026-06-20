import Sidebar from "../../components/Sidebar";
import { useState } from "react";

const VolunteerTasks = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Medical Assistance",
      location: "Noida Sector 62",
      status: "Assigned",
    },
    {
      id: 2,
      title: "Food Distribution",
      location: "Ghaziabad",
      status: "Assigned",
    },
    {
      id: 3,
      title: "Shelter Support",
      location: "Gurugram",
      status: "In Progress",
    },
  ]);

  const updateStatus = (id, status) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status } : task
      )
    );
  };

  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-600">
            📋 Volunteer Tasks
          </h1>

          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Manage assigned rescue and support operations.
          </p>
        </div>

        <div className="space-y-6">

          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            >

              <div className="flex justify-between items-center mb-4">

                <div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                    {task.title}
                  </h2>

                  <p className="text-gray-500 dark:text-gray-400">
                    📍 {task.location}
                  </p>
                </div>

                <span
                  className={`px-4 py-2 rounded-full text-sm ${
                    task.status === "Assigned"
                      ? "bg-yellow-100 text-yellow-700"
                      : task.status === "In Progress"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {task.status}
                </span>

              </div>

              <div className="flex gap-4">

                <button
                  onClick={() =>
                    updateStatus(task.id, "In Progress")
                  }
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Start Task
                </button>

                <button
                  onClick={() =>
                    updateStatus(task.id, "Completed")
                  }
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Mark Complete
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default VolunteerTasks;