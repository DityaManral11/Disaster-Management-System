import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = () => {
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

      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Login Successful");
      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden max-w-4xl w-full grid md:grid-cols-2">

        <div className="bg-red-600 text-white p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">
            Welcome Back!
          </h1>

          <p className="text-lg mb-6">
            Login to access emergency alerts, SOS services,
            shelter locations, and volunteer support.
          </p>

          <ul className="space-y-3">
            <li>Real-time Disaster Alerts</li>
            <li>SOS Emergency Assistance</li>
            <li>Shelter Locator</li>
            <li>Volunteer Coordination</li>
          </ul>
        </div>

        <div className="p-10">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="block text-gray-700 mb-2 dark:text-gray-300">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
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
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
            >
              Login
            </button>

          </form>

          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-red-600 font-semibold"
            >
              Register
            </Link>
          </p>

          <div className="text-center mt-4">
            <Link
              to="/"
              className="text-blue-600"
            >
              Back to Home
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Login;