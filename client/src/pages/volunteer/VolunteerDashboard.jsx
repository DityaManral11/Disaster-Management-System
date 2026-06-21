import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";

const VolunteerDashboard = () => {
  const [tasks, setTasks] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?.user_id) {
      fetch(`http://localhost:5000/api/tasks/volunteer/${user.user_id}`)
        .then((res) => res.json())
        .then((data) => setTasks(data))
        .catch((err) => console.error("Task fetch error:", err));
    }
  }, [user?.user_id]);

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-600 dark:text-green-400">
            🤝 Volunteer Dashboard
          </h1>

          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Coordinate rescue efforts and help citizens during emergencies.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-gray-500 dark:text-gray-400">
              Assigned Tasks
            </h3>
            <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mt-2">
              {tasks.length}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-gray-500 dark:text-gray-400">
              Completed Missions
            </h3>
            <p className="text-4xl font-bold text-green-600 dark:text-green-400 mt-2">
              {completedTasks}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-gray-500 dark:text-gray-400">
              Availability
            </h3>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">
              Active
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            📋 My Tasks
          </h2>

          <div className="space-y-4">
            {tasks.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-300">
                No task assigned yet.
              </p>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.task_id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800 dark:text-white">
                        {task.title}
                      </h3>

                      <p className="text-gray-500 dark:text-gray-300">
                        {task.description}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        task.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : task.status === "In Progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;