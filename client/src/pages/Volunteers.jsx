import { useState } from "react";
import Sidebar from "../components/Sidebar";

const volunteerTasks = [
  {
    id: 1,
    task: "Flood Rescue Support",
    location: "Patna, Bihar",
    status: "Active",
    date: "Today",
  },
  {
    id: 2,
    task: "Food Distribution",
    location: "Gaya, Bihar",
    status: "Pending",
    date: "Tomorrow",
  },
  {
    id: 3,
    task: "Medical Assistance",
    location: "Muzaffarpur, Bihar",
    status: "Completed",
    date: "Yesterday",
  },
  {
    id: 4,
    task: "Shelter Management",
    location: "Nalanda, Bihar",
    status: "Active",
    date: "Today",
  },
];

const Volunteers = () => {
  const [volunteer, setVolunteer] = useState({
    name: "",
    phone: "",
    skills: "",
    availability: "",
  });

  const handleChange = (e) => {
    setVolunteer({
      ...volunteer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("🎉 Volunteer Registered Successfully!");

    setVolunteer({
      name: "",
      phone: "",
      skills: "",
      availability: "",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400";
      case "Pending":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400";
      case "Completed":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-red-600 dark:text-red-400">
            🤝 Volunteer Portal
          </h1>

          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Join our volunteer network and help communities during emergencies.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-gray-500 dark:text-gray-400">
              Active Volunteers
            </h3>

            <p className="text-4xl font-bold text-red-600 dark:text-red-400 mt-2">
              150
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-gray-500 dark:text-gray-400">
              Ongoing Tasks
            </h3>

            <p className="text-4xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">
              24
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-gray-500 dark:text-gray-400">
              Completed Missions
            </h3>

            <p className="text-4xl font-bold text-green-600 dark:text-green-400 mt-2">
              86
            </p>
          </div>

        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Registration Form */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">

            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              📝 Become a Volunteer
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={volunteer.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={volunteer.phone}
                  onChange={handleChange}
                  required
                  placeholder="Enter phone number"
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Skills
                </label>

                <select
                  name="skills"
                  value={volunteer.skills}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Select Skill</option>
                  <option value="Medical Assistance">
                    Medical Assistance
                  </option>
                  <option value="Rescue Operations">
                    Rescue Operations
                  </option>
                  <option value="Food Distribution">
                    Food Distribution
                  </option>
                  <option value="Shelter Management">
                    Shelter Management
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Availability
                </label>

                <select
                  name="availability"
                  value={volunteer.availability}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Select Availability</option>
                  <option value="Full Time">
                    Full Time
                  </option>
                  <option value="Part Time">
                    Part Time
                  </option>
                  <option value="Weekends">
                    Weekends Only
                  </option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
              >
                Register as Volunteer
              </button>

            </form>

          </div>

          {/* Tasks */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">

            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              🚑 Volunteer Tasks
            </h2>

            <div className="space-y-4">

              {volunteerTasks.map((task) => (
                <div
                  key={task.id}
                  className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-center">

                    <div>
                      <h3 className="font-bold text-lg text-gray-800 dark:text-white">
                        {task.task}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-300">
                        📍 {task.location}
                      </p>

                      <p className="text-gray-500 dark:text-gray-400">
                        📅 {task.date}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        task.status
                      )}`}
                    >
                      {task.status}
                    </span>

                  </div>
                </div>
              ))}

            </div>

          </div>

        </div>

        {/* Volunteer Guidelines */}
        <div className="mt-10 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-lg">

          <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-3">
            📌 Volunteer Guidelines
          </h3>

          <ul className="list-disc ml-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Always follow instructions from emergency coordinators.</li>
            <li>Ensure your safety before assisting others.</li>
            <li>Carry necessary identification and emergency kits.</li>
            <li>Report any incidents immediately.</li>
          </ul>

        </div>

      </div>
    </div>
  );
};

export default Volunteers;