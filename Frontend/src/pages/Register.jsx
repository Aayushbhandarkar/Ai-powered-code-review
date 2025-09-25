import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

function Register({ setAuth, setIsRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  // ✅ Base API URL (no /auth/login here!)
  const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://ai-powered-code-review-backend.onrender.com";

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);
    setNotification(null);

    try {
      // Register user
      await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
      });

      // Auto login after register
      const loginRes = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", loginRes.data.token);
      setAuth(true);
      setNotification({
        type: "success",
        message: "Registered & logged in successfully!",
      });
    } catch (err) {
      console.error("Register Error:", err);
      setNotification({
        type: "error",
        message: err.response?.data?.message || "Registration failed",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b0c10] via-[#0d1117] to-[#1a1d29] relative px-4 sm:px-6">
      {/* Notification */}
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`absolute top-5 left-1/2 transform -translate-x-1/2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg text-white font-medium z-10 flex items-center ${
            notification.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          <span className="mr-2">
            {notification.type === "success" ? "✓" : "✗"}
          </span>
          {notification.message}
        </motion.div>
      )}

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex w-full max-w-4xl min-h-[500px] rounded-xl overflow-hidden shadow-2xl border border-gray-800/50 backdrop-blur-md bg-[#10131a] flex-col md:flex-row"
      >
        {/* Left Side (branding) */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-900/40 to-indigo-900/40 flex-col items-center justify-center p-8 text-center relative">
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-center space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 18l6-6-6-6M8 6l-6 6 6 6"
                />
              </svg>
              <h1 className="text-3xl font-extrabold text-white tracking-wide">
                <Typewriter
                  words={["CodeReviewer"]}
                  loop={false}
                  typeSpeed={100}
                  cursor
                  cursorStyle="|"
                />
              </h1>
            </div>
            <p className="text-gray-400 text-lg mt-4 font-medium tracking-[0.25em]">
              <Typewriter
                words={["BUG FINDER"]}
                loop={false}
                typeSpeed={120}
                cursor
                cursorStyle="|"
              />
            </p>
          </div>
        </div>

        {/* Right Side (form) */}
        <div className="w-full md:w-1/2 bg-[#0f1117] p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Create Account
          </h2>
          <p className="text-gray-400 mb-6 text-sm">
            Join CodeReviewer to start finding and fixing bugs smarter.
          </p>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name Field */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="relative"
            >
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#1b1e25] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700 text-sm"
                required
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </motion.div>

            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#1b1e25] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700 text-sm"
                required
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#1b1e25] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700 text-sm"
                required
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </motion.div>

            {/* Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              className={`w-full py-3 px-4 rounded-lg text-white font-semibold shadow-lg text-sm ${
                loading
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#1e293b] to-[#0f172a] hover:from-[#334155] hover:to-[#1e293b]"
              } transition-all duration-300`}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-xs">
              Already have an account?{" "}
              <button
                onClick={() => setIsRegister(false)}
                className="text-blue-400 hover:text-blue-300 font-semibold underline"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;
