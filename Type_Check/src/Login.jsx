import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/signin", {
        email,
        password,
      });

      if (response.status === 200) {
        console.log("Login successful:", response.data);
        // Redirect to the home page or dashboard
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-main_bg">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className="mt-6 text-2xl font-bold text-text_color sm:text-3xl md:text-4xl dark:text-white">
              Welcome to CrazyType
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500 dark:text-gray-400">
              Put your Typing skills to the test.
            </p>

            <form onSubmit={handleLogin} className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="col-span-6">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                  required
                />
              </div>

              {/* Login Button */}
              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  type="submit"
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0 dark:text-gray-400">
                  Don't have an account?
                  <a
                    href="/auth/signup"
                    className="text-gray-700 underline dark:text-gray-200"
                  >
                    Sign Up
                  </a>
                  .
                </p>
              </div>
            </form>

            {/* Error Message */}
            {error && (
              <p className="mt-4 text-sm text-red-500 dark:text-red-400">{error}</p>
            )}
          </div>
        </main>
      </div>
    </section>
  );
}

export default Login;
