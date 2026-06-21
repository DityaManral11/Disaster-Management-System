import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const volunteerTasks = [
  {
    id: 1,
    task: "Flood Rescue Support",
    location: "Connaught Place, New Delhi",
    status: "Active",
    date: "Today",
    volunteersNeeded: 12,
  },
  {
    id: 2,
    task: "Food Distribution",
    location: "Sector 62, Noida, Uttar Pradesh",
    status: "Pending",
    date: "Tomorrow",
    volunteersNeeded: 18,
  },
  {
    id: 3,
    task: "Medical Assistance",
    location: "Raj Nagar Extension, Ghaziabad",
    status: "Completed",
    date: "Yesterday",
    volunteersNeeded: 8,
  },
  {
    id: 4,
    task: "Shelter Management",
    location: "Sector 29, Gurugram, Haryana",
    status: "Active",
    date: "Today",
    volunteersNeeded: 15,
  },
  {
    id: 5,
    task: "Emergency Supplies Transport",
    location: "Sector 15, Faridabad, Haryana",
    status: "Active",
    date: "Today",
    volunteersNeeded: 10,
  },
  {
    id: 6,
    task: "Evacuation Assistance",
    location: "Knowledge Park II, Greater Noida",
    status: "Pending",
    date: "Tomorrow",
    volunteersNeeded: 20,
  },
];

const Volunteers = () => {
  const [volunteer, setVolunteer] = useState({
    name: "",
    phone: "",
    skills: "",
    availability: "",
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const handleChange = (e) => {
    setVolunteer({
      ...volunteer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser?.user_id) {
      alert("Please login first");
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/users/become-volunteer/${savedUser.user_id}`,
        {
          full_name: volunteer.name,
          phone: volunteer.phone,
          skills: volunteer.skills,
          availability: volunteer.availability,
        }
      );

      const updatedUser = {
        ...savedUser,
        full_name: volunteer.name,
        role: "volunteer",
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      alert("🎉 Volunteer Registered Successfully!");

      setVolunteer({
        name: "",
        phone: "",
        skills: "",
        availability: "",
      });
    } catch (error) {
      console.error(error);
      alert("❌ Failed to register volunteer");
   }
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

  const filteredTasks = volunteerTasks.filter((task) => {
    const matchesSearch =
      task.task.toLowerCase().includes(search.toLowerCase()) ||
      task.location.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || task.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-red-600 dark:text-red-400">
            🤝 Volunteer Portal
          </h1>

          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Join our volunteer network and support emergency response across
            Delhi NCR.
          </p>
        </div>

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
            <h3 className="text-gray-500 dark:text-gray-400">Ongoing Tasks</h3>
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
                  <option value="Medical Assistance">Medical Assistance</option>
                  <option value="Rescue Operations">Rescue Operations</option>
                  <option value="Food Distribution">Food Distribution</option>
                  <option value="Shelter Management">Shelter Management</option>
                  <option value="Transportation Support">
                    Transportation Support
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
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Weekends">Weekends Only</option>
                  <option value="Emergency Only">Emergency Only</option>
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

          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              🚑 Volunteer Tasks
            </h2>

            <div className="mb-6 grid md:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="🔍 Search task or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="space-y-4 max-h-[620px] overflow-y-auto pr-1">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800 dark:text-white">
                        {task.task}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-300 mt-1">
                        📍 {task.location}
                      </p>

                      <p className="text-gray-500 dark:text-gray-400">
                        📅 {task.date}
                      </p>

                      <p className="text-gray-500 dark:text-gray-400">
                        👥 Volunteers Needed: {task.volunteersNeeded}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${getStatusColor(
                        task.status
                      )}`}
                    >
                      {task.status}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <button
                      onClick={() =>
                        window.open(
                          `https://maps.google.com/maps?q=${encodeURIComponent(
                            task.location
                          )}`,
                          "_blank"
                        )
                      }
                      className="bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                    >
                      View Area
                    </button>

                    <button
                      onClick={() =>
                        window.open(
                          `https://maps.google.com/maps?daddr=${encodeURIComponent(
                            task.location
                          )}`,
                          "_blank"
                        )
                      }
                      className="border border-red-600 text-red-600 dark:text-red-400 dark:border-red-400 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                    >
                      Route
                    </button>
                  </div>
                </div>
              ))}

              {filteredTasks.length === 0 && (
                <p className="text-center text-gray-600 dark:text-gray-300">
                  No volunteer tasks found.
                </p>
              )}
            </div>
          </div>
        </div>

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