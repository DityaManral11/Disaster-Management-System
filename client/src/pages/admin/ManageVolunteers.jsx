import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";

const defaultVolunteers = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "+91 9876543210",
    location: "Noida",
    skills: "Medical Assistance",
    availability: "Available",
    status: "Available",
    assignedTask: "None",
  },
  {
    id: 2,
    name: "Priya Singh",
    email: "priya@example.com",
    phone: "+91 9876543211",
    location: "Gurugram",
    skills: "Food Distribution",
    availability: "Part Time",
    status: "Assigned",
    assignedTask: "Food Distribution",
  },
  {
    id: 3,
    name: "Aman Verma",
    email: "aman@example.com",
    phone: "+91 9876543212",
    location: "Faridabad",
    skills: "Rescue Operations",
    availability: "Available",
    status: "Available",
    assignedTask: "None",
  },
];

const ManageVolunteers = () => {
  const [volunteers, setVolunteers] = useState(defaultVolunteers);

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/volunteers");

      const dbVolunteers = res.data.map((user) => ({
        id: `db-${user.user_id}`,
        name: user.full_name,
        email: user.email,
        phone: "Not Added",
        location: "Not Added",
        skills: "General Support",
        availability: "Available",
        status: "Available",
        assignedTask: "None",
      }));

      setVolunteers([...dbVolunteers, ...defaultVolunteers]);
    } catch (error) {
      console.error("Volunteer fetch error:", error);
    }
  };

  const assignTask = (id) => {
    const task = prompt("Enter task for volunteer:");
    if (!task) return;

    setVolunteers((prev) =>
      prev.map((volunteer) =>
        volunteer.id === id
          ? { ...volunteer, status: "Assigned", assignedTask: task }
          : volunteer
      )
    );

    alert("Task assigned successfully!");
  };

  const markAvailable = (id) => {
    setVolunteers((prev) =>
      prev.map((volunteer) =>
        volunteer.id === id
          ? { ...volunteer, status: "Available", assignedTask: "None" }
          : volunteer
      )
    );
  };

  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-red-600 dark:text-red-400 mb-8">
          🤝 Manage Volunteers
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Location</th>
                <th className="p-4">Skills</th>
                <th className="p-4">Availability</th>
                <th className="p-4">Task</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {volunteers.map((volunteer) => (
                <tr
                  key={volunteer.id}
                  className="border-b dark:border-gray-700 text-gray-800 dark:text-gray-200"
                >
                  <td className="p-4 font-semibold">{volunteer.name}</td>

                  <td className="p-4">
                    <p>{volunteer.email}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {volunteer.phone}
                    </p>
                  </td>

                  <td className="p-4">{volunteer.location}</td>
                  <td className="p-4">{volunteer.skills}</td>
                  <td className="p-4">{volunteer.availability}</td>
                  <td className="p-4">{volunteer.assignedTask}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        volunteer.status === "Available"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {volunteer.status}
                    </span>
                  </td>

                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => assignTask(volunteer.id)}
                      className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Assign
                    </button>

                    <button
                      onClick={() => markAvailable(volunteer.id)}
                      className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700"
                    >
                      Free
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-gray-500 dark:text-gray-400 mt-4">
          Registered volunteers are fetched from database. Extra details can be added later in volunteer profile.
        </p>
      </div>
    </div>
  );
};

export default ManageVolunteers;