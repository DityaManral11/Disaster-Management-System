import Sidebar from "../../components/Sidebar";
import { useState } from "react";

const ManageResources = () => {
  const [resources, setResources] = useState([
    {
      id: 1,
      name: "Food Packets",
      category: "Food",
      quantity: 1200,
      unit: "Packets",
      location: "Noida Relief Camp",
      status: "Available",
    },
    {
      id: 2,
      name: "Water Bottles",
      category: "Water",
      quantity: 5000,
      unit: "Bottles",
      location: "Delhi Civil Relief Shelter",
      status: "Available",
    },
    {
      id: 3,
      name: "Medical Kits",
      category: "Medical",
      quantity: 350,
      unit: "Kits",
      location: "Gurugram Shelter",
      status: "Limited",
    },
    {
      id: 4,
      name: "Blankets",
      category: "Relief",
      quantity: 800,
      unit: "Pieces",
      location: "Ghaziabad Disaster Camp",
      status: "Available",
    },
    {
      id: 5,
      name: "Rescue Ropes",
      category: "Rescue",
      quantity: 90,
      unit: "Units",
      location: "Faridabad Emergency Center",
      status: "Limited",
    },
    {
      id: 6,
      name: "Emergency Torches",
      category: "Equipment",
      quantity: 150,
      unit: "Units",
      location: "Greater Noida Relief Hub",
      status: "Available",
    },
  ]);

  const addResource = () => {
    const name = prompt("Enter resource name:");
    if (!name) return;

    const category = prompt("Enter category:");
    if (!category) return;

    const quantity = Number(prompt("Enter quantity:"));
    if (!quantity) return;

    const location = prompt("Enter storage location:");
    if (!location) return;

    const newResource = {
      id: Date.now(),
      name,
      category,
      quantity,
      unit: "Units",
      location,
      status: quantity < 100 ? "Limited" : "Available",
    };

    setResources([newResource, ...resources]);
    alert("Resource added successfully!");
  };

  const updateQuantity = (id) => {
    const resource = resources.find((item) => item.id === id);

    const newQuantity = Number(
      prompt("Enter updated quantity:", resource.quantity)
    );

    if (newQuantity < 0 || Number.isNaN(newQuantity)) {
      alert("Invalid quantity");
      return;
    }

    setResources(
      resources.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: newQuantity,
              status: newQuantity < 100 ? "Limited" : "Available",
            }
          : item
      )
    );

    alert("Quantity updated successfully!");
  };

  const deleteResource = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resource?"
    );

    if (!confirmDelete) return;

    setResources(resources.filter((item) => item.id !== id));
  };

  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8 pr-24">
          <h1 className="text-4xl font-bold text-red-600 dark:text-red-400">
            🧰 Manage Resources
          </h1>

          <button
            onClick={addResource}
            className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Add Resource
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <p className="text-gray-500 dark:text-gray-400">Total Resources</p>
            <h2 className="text-4xl font-bold text-blue-600 mt-2">
              {resources.length}
            </h2>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <p className="text-gray-500 dark:text-gray-400">Available Items</p>
            <h2 className="text-4xl font-bold text-green-600 mt-2">
              {resources.filter((item) => item.status === "Available").length}
            </h2>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <p className="text-gray-500 dark:text-gray-400">Limited Stock</p>
            <h2 className="text-4xl font-bold text-yellow-600 mt-2">
              {resources.filter((item) => item.status === "Limited").length}
            </h2>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="p-4">Resource</th>
                <th className="p-4">Category</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Location</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {resources.map((resource) => (
                <tr
                  key={resource.id}
                  className="border-b dark:border-gray-700 text-gray-800 dark:text-gray-200"
                >
                  <td className="p-4 font-semibold">{resource.name}</td>
                  <td className="p-4">{resource.category}</td>
                  <td className="p-4">
                    {resource.quantity} {resource.unit}
                  </td>
                  <td className="p-4">{resource.location}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        resource.status === "Available"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {resource.status}
                    </span>
                  </td>

                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => updateQuantity(resource.id)}
                      className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Update
                    </button>

                    <button
                      onClick={() => deleteResource(resource.id)}
                      className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-gray-500 dark:text-gray-400 mt-4">
          Note: Resource data is currently managed on frontend. It can later be
          connected with MySQL using backend APIs.
        </p>
      </div>
    </div>
  );
};

export default ManageResources;