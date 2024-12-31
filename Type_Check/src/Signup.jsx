import React, { useState } from "react";
import axios from "axios";
const apiurl = import.meta.env.VITE_API_URL;

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const response = await axios.post(`${apiurl}/signup`, formData);
      window.location.href = "/auth/login";
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-main_bg flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-text_color text-center">
          Welcome to CrazyType
        </h1>
        <p className="mt-2 text-center text-gray-400">
          Put your Typing skills to the test.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Username
              </label>
              <input
                type="text"
                name="username"
                required
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="marketing"
                className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-blue-600"
              />
              <label htmlFor="marketing" className="ml-2 text-sm text-gray-400">
                I want to receive updates and announcements.
              </label>
            </div>

            {error && (
              <p className="text-sm text-red-400">{error}</p>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? "Creating account..." : "Create account"}
              </button>
            </div>

            <p className="text-sm text-gray-400 text-center">
              Already have an account?{" "}
              <a href="/auth/login" className="text-blue-400 hover:text-blue-300">
                Log in
              </a>
            </p>
          </form>

          <p className="mt-6 text-xs text-gray-400 text-center">
            By creating an account, you agree to our{" "}
            <a href="#" className="text-blue-400 hover:text-blue-300">
              terms
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-400 hover:text-blue-300">
              privacy policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;