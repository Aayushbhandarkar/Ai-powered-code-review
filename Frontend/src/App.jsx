import { useState, useEffect } from "react";
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
    setPage("login"); // This is enough to redirect to login page
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
