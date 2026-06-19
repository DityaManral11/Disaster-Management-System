import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "citizen",
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
        "http://localhost:5000/api/auth/register",
        formData
      );

      alert(res.data.message);

      setFormData({
        full_name: "",
        email: "",
        password: "",
        role: "citizen",
      });

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4 py-10">
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden max-w-6xl w-full grid lg:grid-cols-2">

        {/* Left Side */}
        <div className="bg-gradient-to-br from-red-600 to-red-800 text-white p-10 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">
              🚨 Join Our Emergency Network
            </h1>

            <p className="text-lg text-red-100">
              Become a part of the Disaster Management System and help build safer communities.
            </p>
          </div>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="bg-white text-red-600 rounded-full w-10 h-10 flex items-center justify-center text-xl">
                🔔
              </div>

              <div>
                <h3 className="font-semibold">Real-Time Alerts</h3>
                <p className="text-sm text-red-100">
                  Receive instant disaster notifications.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-white text-red-600 rounded-full w-10 h-10 flex items-center justify-center text-xl">
                🏠
              </div>

              <div>
                <h3 className="font-semibold">Shelter Assistance</h3>
                <p className="text-sm text-red-100">
                  Find nearby safe shelters quickly.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-white text-red-600 rounded-full w-10 h-10 flex items-center justify-center text-xl">
                🚑
              </div>

              <div>
                <h3 className="font-semibold">Emergency Support</h3>
                <p className="text-sm text-red-100">
                  Access SOS and rescue services.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="p-8 lg:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              Create Account
            </h2>

            <p className="text-gray-500 dark:text-gray-300 mt-2">
              Register to access emergency services
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Role
              </label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 dark:bg-gray-700 dark:text-white"
              >
                <option value="citizen">Citizen</option>
                <option value="volunteer">Volunteer</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition duration-300 font-semibold"
            >
              Create Account
            </button>

          </form>

          <p className="text-center mt-6 text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-red-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>

          <div className="text-center mt-4">
            <Link
              to="/"
              className="text-blue-600 hover:underline"
            >
              ← Back to Home
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;