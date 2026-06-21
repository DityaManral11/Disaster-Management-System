import Sidebar from "../../components/Sidebar";
import { useState } from "react";

const ManageShelters = () => {
  const [shelters, setShelters] = useState([
    {
      id: 1,
      name: "Noida Relief Camp",
      location: "Noida, Uttar Pradesh",
      capacity: 500,
      occupied: 320,
      contact: "+91 9876543210",
      manager: "Rahul Sharma",
    },
    {
      id: 2,
      name: "Gurugram Shelter",
      location: "Gurugram, Haryana",
      capacity: 300,
      occupied: 180,
      contact: "+91 9876543211",
      manager: "Priya Singh",
    },
    {
    id: 3,
    name: "Faridabad Emergency Center",
    location: "Faridabad, Haryana",
    capacity: 400,
    occupied: 210,
    contact: "+91 9876543212",
    manager: "Aman Verma",
  },
  {
    id: 4,
    name: "Ghaziabad Disaster Camp",
    location: "Ghaziabad, Uttar Pradesh",
    capacity: 350,
    occupied: 95,
    contact: "+91 9876543213",
    manager: "Neha Gupta",
  },
  {
    id: 5,
    name: "Delhi Civil Relief Shelter",
    location: "New Delhi",
    capacity: 800,
    occupied: 540,
    contact: "+91 9876543214",
    manager: "Rohit Mehra",
  },
  {
    id: 6,
    name: "Dwarka Safe Zone",
    location: "Dwarka, Delhi",
    capacity: 450,
    occupied: 120,
    contact: "+91 9876543215",
    manager: "Anjali Sharma",
  },
  {
    id: 7,
    name: "Rohini Community Shelter",
    location: "Rohini, Delhi",
    capacity: 600,
    occupied: 430,
    contact: "+91 9876543216",
    manager: "Karan Singh",
  },
  {
    id: 8,
    name: "Greater Noida Relief Hub",
    location: "Greater Noida",
    capacity: 550,
    occupied: 240,
    contact: "+91 9876543217",
    manager: "Sakshi Verma",
  },
]);

  const addShelter = () => {
    const name = prompt("Enter shelter name:");
    if (!name) return;

    const location = prompt("Enter location:");
    if (!location) return;

    const capacity = Number(prompt("Enter total capacity:"));
    if (!capacity) return;

    const newShelter = {
      id: Date.now(),
      name,
      location,
      capacity,
      occupied: 0,
      contact: "+91 0000000000",
      manager: "Not Assigned",
    };

    setShelters([...shelters, newShelter]);
    alert("Shelter added successfully!");
  };

  const editShelter = (id) => {
    const shelter = shelters.find((item) => item.id === id);

    const newOccupied = Number(
      prompt("Enter occupied seats:", shelter.occupied)
    );

    if (newOccupied < 0 || newOccupied > shelter.capacity) {
      alert("Invalid occupied number");
      return;
    }

    setShelters(
      shelters.map((item) =>
        item.id === id ? { ...item, occupied: newOccupied } : item
      )
    );

    alert("Shelter updated successfully!");
  };

  const deleteShelter = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this shelter?"
    );

    if (!confirmDelete) return;

    setShelters(shelters.filter((item) => item.id !== id));
  };

  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8 pr-24">
          <h1 className="text-4xl font-bold text-red-600 dark:text-red-400">
            🏕️ Manage Shelters
          </h1>

          <button
            onClick={addShelter}
            className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Add Shelter
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {shelters.map((shelter) => {
            const available = shelter.capacity - shelter.occupied;
            const occupancy = Math.round(
              (shelter.occupied / shelter.capacity) * 100
            );

            return (
              <div
                key={shelter.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                      {shelter.name}
                    </h2>

                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                      📍 {shelter.location}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      occupancy >= 80
                        ? "bg-red-100 text-red-700"
                        : occupancy >= 50
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {occupancy}% Full
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6 text-center">
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-gray-500 dark:text-gray-300">
                      Capacity
                    </p>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                      {shelter.capacity}
                    </h3>
                  </div>

                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-gray-500 dark:text-gray-300">
                      Occupied
                    </p>
                    <h3 className="text-2xl font-bold text-red-600">
                      {shelter.occupied}
                    </h3>
                  </div>

                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-gray-500 dark:text-gray-300">
                      Available
                    </p>
                    <h3 className="text-2xl font-bold text-green-600">
                      {available}
                    </h3>
                  </div>
                </div>

                <div className="mt-6 space-y-2 text-gray-700 dark:text-gray-300">
                  <p>📞 Contact: {shelter.contact}</p>
                  <p>👤 Manager: {shelter.manager}</p>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => editShelter(shelter.id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Edit Occupancy
                  </button>

                  <button
                    onClick={() => deleteShelter(shelter.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ManageShelters;