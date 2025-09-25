import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function Login({ setAuth, setIsRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  // ✅ Typewriter effect states
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  // ✅ Determine API URL dynamically
  const API_URL = import.meta.env.VITE_API_URL || "import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";

function App() {
  const [page, setPage] = useState(localStorage.getItem("token") ? "review" : "landing");

  const [code, setCode] = useState(`function sum() {
  return 1 + 1
}`);
  const [review, setReview] = useState(``);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    setLoading(true);
    setReview("");
    try {
      const response = await axios.post(
        "https://ai-powered-code-review-backend.onrender.com/ai/get-review",
        { code }
      );
      setReview(response.data);
    } catch (err) {
      console.error("Error reviewing code:", err);
      setReview("⚠️ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function setAuth(status) {
    if (status) {
      setPage("review");
    } else {
      setPage("login");
    }
  }

  function setIsRegister(flag) {
    setPage(flag ? "register" : "login");
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setPage("login");
    window.location.href = "/login";
  }

  // --- Render pages ---
  if (page === "landing") {
    return <Landing onNavigate={(p) => setPage(p)} />;
  }

  if (page === "login") {
    return <Login setAuth={setAuth} setIsRegister={setIsRegister} />;
  }

  if (page === "register") {
    return <Register setAuth={setAuth} setIsRegister={setIsRegister} />;
  }

  // --- Review Page ---
  const titleText = "Code Reviewer";
  const [titleDisplayed, setTitleDisplayed] = useState("");
  const [logoStep, setLogoStep] = useState(0);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTitleDisplayed(titleText.slice(0, i));
      i++;
      if (i > titleText.length) {
        clearInterval(interval);
      }
    }, 80);
    return () => clearInterval(interval);
  }, [logoStep]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0c10] text-white">
      {/* Header with logo & typing effect */}
      <header className="flex flex-wrap justify-between items-center px-6 md:px-8 py-4 bg-gradient-to-r from-[#0f172a] to-[#1e293b] border-b border-gray-800 shadow-lg">
        <div className="flex items-center gap-3 mb-3 md:mb-0">
          {/* 🔥 Same Logo from Landing */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className="h-9 w-9 md:h-10 md:w-10 text-blue-500/80 drop-shadow-md"
            fill="currentColor"
          >
            <path d="M50 5 L61 25 L50 45 L39 25 Z" />  {/* Top diamond */}
            <path d="M50 55 L61 75 L50 95 L39 75 Z" /> {/* Bottom diamond */}
            <path d="M5 50 L25 61 L45 50 L25 39 Z" />  {/* Left diamond */}
            <path d="M55 50 L75 61 L95 50 L75 39 Z" /> {/* Right diamond */}
          </svg>
          <h1 className="text-xl md:text-2xl font-bold tracking-wide">
            {titleDisplayed}
            {titleDisplayed.length < titleText.length && <span className="animate-pulse">|</span>}
          </h1>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={() => setPage("landing")}
            className="text-xs md:text-sm px-3 py-1 rounded-md hover:bg-white/5 transition"
          >
            Home
          </button>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-3 py-1.5 md:px-5 md:py-2 rounded-lg font-medium shadow-md text-xs md:text-sm transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main layout */}
      <main className="flex flex-col lg:flex-row gap-6 p-4 md:p-6 flex-1 overflow-hidden">
        {/* Left: Editor */}
        <div className="flex-1 relative flex flex-col bg-[#0f1117] rounded-2xl shadow-lg border border-gray-800 overflow-hidden min-h-[300px]">
          <div className="px-4 py-3 border-b border-gray-800 bg-[#11141c] flex items-center justify-between">
            <h2 className="text-sm md:text-lg font-semibold text-gray-300">Code Editor</h2>
            {/* 🔥 Review Code Button */}
            <button
              onClick={reviewCode}
              disabled={loading}
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg font-semibold shadow-md text-xs md:text-sm transition ${
                loading
                  ? "bg-gray-600 cursor-not-allowed text-white"
                  : "bg-gradient-to-r from-[#1e293b] to-[#0f172a] hover:from-[#334155] hover:to-[#1e293b] text-white"
              }`}
            >
              {loading ? "Reviewing..." : "Review Code"}
            </button>
          </div>

          <div className="flex-1">
            <Editor
              value={code}
              onValueChange={(c) => setCode(c)}
              highlight={(c) => prism.highlight(c, prism.languages.javascript, "javascript")}
              padding={14}
              style={{
                fontFamily: '"Fira Code", "Fira Mono", monospace',
                fontSize: 14,
                height: "100%",
                width: "100%",
              }}
            />
          </div>
        </div>

        {/* Right: Review Output */}
        <div className="flex-1 bg-[#10131a] rounded-2xl shadow-lg border border-gray-800 p-4 md:p-6 overflow-auto flex flex-col min-h-[300px]">
          <div className="pb-2 md:pb-3 mb-3 md:mb-4 border-b border-gray-800 flex justify-between items-center">
            <h2 className="text-sm md:text-lg font-semibold text-gray-300">Review Output</h2>
            <span className="text-xs text-gray-500">Insights</span>
          </div>

          <div className="prose prose-invert max-w-none text-gray-200 text-[13px] md:text-[15px] leading-relaxed flex-1">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-[#1e293b] border-t-4 border-t-indigo-500 rounded-full animate-spin" />
              </div>
            ) : review ? (
              <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
            ) : (
              <p className="text-gray-500">Run a review to see insights here...</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
";

  useEffect(() => {
    const fullTitle = "CodeReviewer";
    const fullSubtitle = "BUG FINDER";

    let titleIndex = 0;
    let subtitleIndex = 0;

    const titleInterval = setInterval(() => {
      setTitle(fullTitle.slice(0, titleIndex + 1));
      titleIndex++;
      if (titleIndex === fullTitle.length) {
        clearInterval(titleInterval);

        const subtitleInterval = setInterval(() => {
          setSubtitle(fullSubtitle.slice(0, subtitleIndex + 1));
          subtitleIndex++;
          if (subtitleIndex === fullSubtitle.length) {
            clearInterval(subtitleInterval);
          }
        }, 120);
      }
    }, 120);

    return () => {
      clearInterval(titleInterval);
    };
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setNotification(null);

    try {
      const res = await axios.post(
        `${API_URL}/auth/login`,
        { email, password },
        { withCredentials: true } // ✅ important if backend uses cookies
      );

      localStorage.setItem("token", res.data.token);
      setAuth(true);

      setNotification({ type: "success", message: "Logged in successfully!" });
    } catch (err) {
      console.error("Login Error:", err);
      setNotification({
        type: "error",
        message: err.response?.data?.message || "Login failed",
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
        className="flex w-full max-w-7xl min-h-[600px] md:min-h-[720px] rounded-2xl overflow-hidden shadow-2xl border border-gray-800/50 backdrop-blur-md bg-[#10131a] flex-col md:flex-row"
      >
        {/* Left Side (branding with typing effect) */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-900/40 to-indigo-900/40 flex-col items-center justify-center p-10 lg:p-16 text-center relative">
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-center space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 lg:h-16 lg:w-16 text-blue-400"
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
              <h1 className="text-4xl lg:text-6xl font-extrabold text-white tracking-wide">
                {title}
                <span className="animate-pulse">|</span>
              </h1>
            </div>
            <p className="text-gray-400 text-xl lg:text-2xl mt-6 font-medium tracking-[0.25em]">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Right Side (form) */}
        <div className="w-full md:w-1/2 bg-[#0f1117] p-6 sm:p-10 lg:p-16 flex flex-col justify-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Welcome Back
          </h2>
          <p className="text-gray-400 mb-8 sm:mb-12 text-base sm:text-lg">
            Login to continue finding and fixing bugs smarter.
          </p>

          <form onSubmit={handleLogin} className="space-y-6 sm:space-y-8">
            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="relative"
            >
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 sm:py-5 rounded-lg bg-[#1b1e25] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700 text-base sm:text-lg"
                required
              />
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 sm:py-5 rounded-lg bg-[#1b1e25] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700 text-base sm:text-lg"
                required
              />
            </motion.div>

            {/* Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              className={`w-full py-4 sm:py-5 px-6 rounded-lg text-white font-semibold shadow-lg text-base sm:text-lg ${
                loading
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#1e293b] to-[#0f172a] hover:from-[#334155] hover:to-[#1e293b]"
              } transition-all duration-300`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </motion.button>
          </form>

          <div className="mt-8 sm:mt-10 text-center">
            <p className="text-gray-400 text-sm sm:text-lg">
              Don’t have an account?{" "}
              <button
                onClick={() => setIsRegister(true)}
                className="text-blue-400 hover:text-blue-300 font-semibold underline"
              >
                Register
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
