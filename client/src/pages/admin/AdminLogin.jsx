import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      if (res.data.user.role !== "admin") {
        alert("Access denied. Admin account required.");
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Admin Login Successful");
      navigate("/admin");
    } catch (error) {
      alert(error.response?.data?.message || "Admin Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden max-w-4xl w-full grid md:grid-cols-2">
        <div className="bg-gray-900 text-white p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">Admin Access</h1>

          <p className="text-lg mb-6">
            Login to monitor SOS requests, manage alerts, shelters and disaster
            response resources.
          </p>

          <ul className="space-y-3">
            <li>🆘 SOS Request Monitoring</li>
            <li>📢 Alert Management</li>
            <li>🏠 Shelter Coordination</li>
            <li>📊 Reports Overview</li>
          </ul>
        </div>

        <div className="p-10">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            Admin Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2 dark:text-gray-300">
                Admin Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter admin email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 dark:text-gray-300">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-black transition"
            >
              Login as Admin
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600 dark:text-gray-300">
            User login?{" "}
            <Link to="/login" className="text-red-600 font-semibold">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;