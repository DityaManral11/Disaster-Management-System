import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";

const ManageVolunteers = () => {
  const [volunteers, setVolunteers] = useState([]);

  const [taskData, setTaskData] = useState({
    volunteer_id: "",
    title: "",
    description: "",
  });

  const taskDescriptions = {
    "Medical Assistance": "Provide medical support to affected citizens.",
    "Food Distribution": "Distribute food packets in relief camps.",
    "Rescue Operations": "Assist rescue teams in affected areas.",
    "Shelter Support": "Help manage temporary shelters.",
    "Emergency Evacuation": "Support evacuation of citizens.",
    "Supply Management": "Manage relief supplies and inventory.",
    "Search & Rescue": "Participate in search and rescue missions.",
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const res = await axios.get(
        "https://disaster-management-system-vij2.onrender.com/api/users/volunteers"
      );

      const dbVolunteers = res.data.map((user) => ({
        id: user.user_id,
        name: user.full_name,
        email: user.email,
        phone: user.phone || "Not Added",
        location: user.city || "Not Added",
        skills: user.skills || "General Support",
        availability: user.availability || "Available",
      }));

      setVolunteers(dbVolunteers);
    } catch (error) {
      console.error("Volunteer fetch error:", error);
    }
  };

  const assignTask = async (e) => {
    e.preventDefault();

    if (!taskData.volunteer_id || !taskData.title) {
      alert("Please select volunteer and task");
      return;
    }

    try {
      await axios.post(
        "https://disaster-management-system-vij2.onrender.com/api/tasks/assign",
        taskData
      );

      alert("✅ Task assigned successfully!");

      setTaskData({
        volunteer_id: "",
        title: "",
        description: "",
      });
    } catch (error) {
      console.error("Task assign error:", error);
      alert("❌ Task assign failed");
    }
  };

  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-red-600 dark:text-red-400 mb-8">
          🤝 Manage Volunteers
        </h1>

        {/* Assign Task Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            Assign Task to Volunteer
          </h2>

          <form
            onSubmit={assignTask}
            className="grid md:grid-cols-3 gap-4"
          >
            {/* Volunteer Dropdown */}
            <select
              value={taskData.volunteer_id}
              onChange={(e) =>
                setTaskData({
                  ...taskData,
                  volunteer_id: e.target.value,
                })
              }
              className="p-3 rounded-lg border dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Volunteer</option>

              {volunteers.map((volunteer) => (
                <option
                  key={volunteer.id}
                  value={volunteer.id}
                >
                  {volunteer.name}
                </option>
              ))}
            </select>

            {/* Task Dropdown */}
            <select
              value={taskData.title}
              onChange={(e) =>
                setTaskData({
                  ...taskData,
                  title: e.target.value,
                  description:
                    taskDescriptions[e.target.value] || "",
                })
              }
              className="p-3 rounded-lg border dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Task</option>

              <option value="Medical Assistance">
                Medical Assistance
              </option>

              <option value="Food Distribution">
                Food Distribution
              </option>

              <option value="Rescue Operations">
                Rescue Operations
              </option>

              <option value="Shelter Support">
                Shelter Support
              </option>

              <option value="Emergency Evacuation">
                Emergency Evacuation
              </option>

              <option value="Supply Management">
                Supply Management
              </option>

              <option value="Search & Rescue">
                Search & Rescue
              </option>
            </select>

            {/* Auto Description */}
            <input
              type="text"
              value={taskData.description}
              readOnly
              className="p-3 rounded-lg border bg-gray-100 dark:bg-gray-700 dark:text-white"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 md:col-span-3"
            >
              Assign Task
            </button>
          </form>
        </div>

        {/* Volunteer List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Location</th>
                <th className="p-4">Skills</th>
                <th className="p-4">Availability</th>
              </tr>
            </thead>

            <tbody>
              {volunteers.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="p-4 text-center text-gray-500 dark:text-gray-300"
                  >
                    No volunteers found.
                  </td>
                </tr>
              ) : (
                volunteers.map((volunteer) => (
                  <tr
                    key={volunteer.id}
                    className="border-b dark:border-gray-700 text-gray-800 dark:text-gray-200"
                  >
                    <td className="p-4 font-semibold">
                      {volunteer.name}
                    </td>

                    <td className="p-4">
                      <p>{volunteer.email}</p>

                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {volunteer.phone}
                      </p>
                    </td>

                    <td className="p-4">
                      {volunteer.location}
                    </td>

                    <td className="p-4">
                      {volunteer.skills}
                    </td>

                    <td className="p-4">
                      {volunteer.availability}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <p className="text-gray-500 dark:text-gray-400 mt-4">
          Registered volunteers are fetched from database.
          Assigned tasks will appear on the volunteer dashboard.
        </p>
      </div>
    </div>
  );
};

export default ManageVolunteers;