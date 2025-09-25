import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Landing({ onNavigate = (page) => {} }) {
  const fullCode = `function sum(a, b) {
  // quick check
  return a + b;
}

// TODO: handle invalid inputs`;

  const [displayedCode, setDisplayedCode] = useState("");
  const [index, setIndex] = useState(0);

  // Typing effect for code
  useEffect(() => {
    const interval = setTimeout(() => {
      setDisplayedCode(fullCode.slice(0, index));
      setIndex((prev) => (prev >= fullCode.length ? 0 : prev + 1));
    }, Math.random() * 120 + 40);
    return () => clearTimeout(interval);
  }, [index, fullCode]);

  // Navbar typing
  const titleText = "CodeReviewer";
  const subtitleText = "Bug Finder · Code Review";

  const [titleDisplayed, setTitleDisplayed] = useState("");
  const [subtitleDisplayed, setSubtitleDisplayed] = useState("");
  const [logoStep, setLogoStep] = useState(0);

  useEffect(() => {
    let text = "";
    if (logoStep === 0) text = titleText;
    if (logoStep === 1) text = subtitleText;

    let i = 0;
    const interval = setInterval(() => {
      if (logoStep === 0) setTitleDisplayed(text.slice(0, i));
      if (logoStep === 1) setSubtitleDisplayed(text.slice(0, i));
      i++;
      if (i > text.length) {
        clearInterval(interval);
        if (logoStep < 1) setTimeout(() => setLogoStep((p) => p + 1), 400);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [logoStep]);

  // Features
  const features = [
    {
      title: "Contextual Reviews",
      desc: "Suggestions that understand your code and test cases, not generic tips.",
    },
    {
      title: "Multi-Language",
      desc: "JavaScript, Python, Java, C#, and more — one tool to cover your stack.",
    },
    {
      title: "Team Ready",
      desc: "Integrate into workflows and get consistent, reviewable results.",
    },
  ];

  // Typing features
  const [typedFeatures, setTypedFeatures] = useState(
    features.map(() => ({ title: "", desc: "" }))
  );

  useEffect(() => {
    features.forEach((feature, idx) => {
      let titleIndex = 0;
      let descIndex = 0;

      const titleInterval = setInterval(() => {
        setTypedFeatures((prev) => {
          const newFeatures = [...prev];
          newFeatures[idx].title = feature.title.slice(0, titleIndex);
          return newFeatures;
        });
        titleIndex++;
        if (titleIndex > feature.title.length) {
          clearInterval(titleInterval);

          const descInterval = setInterval(() => {
            setTypedFeatures((prev) => {
              const newFeatures = [...prev];
              newFeatures[idx].desc = feature.desc.slice(0, descIndex);
              return newFeatures;
            });
            descIndex++;
            if (descIndex > feature.desc.length) clearInterval(descInterval);
          }, 40);
        }
      }, 80);
    });
  }, []);

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-[#06060a] via-[#0b0c10] to-[#0f1117] text-white flex flex-col overflow-hidden">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex items-center justify-between px-4 md:px-12 py-4 md:py-6 w-full bg-transparent backdrop-blur-sm"
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className="h-8 w-8 md:h-10 md:w-10 text-blue-500/80 drop-shadow-md"
            fill="currentColor"
          >
            <path d="M50 5 L61 25 L50 45 L39 25 Z" />
            <path d="M50 55 L61 75 L50 95 L39 75 Z" />
            <path d="M5 50 L25 61 L45 50 L25 39 Z" />
            <path d="M55 50 L75 61 L95 50 L75 39 Z" />
          </svg>
          <div>
            <h1 className="text-base md:text-lg font-semibold">
              {titleDisplayed}
              {logoStep === 0 && <span className="animate-pulse">|</span>}
            </h1>
            <p className="text-xs md:text-sm text-gray-400 -mt-1">
              {subtitleDisplayed}
              {logoStep === 1 && <span className="animate-pulse">|</span>}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-5">
          <motion.button
            whileHover={{ scale: 1.08 }}
            onClick={() => onNavigate("login")}
            className="px-4 py-2 md:px-6 md:py-3 rounded-lg text-sm md:text-base font-medium hover:bg-white/5 transition"
          >
            Login
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.08 }}
            onClick={() => onNavigate("register")}
            className="px-4 py-2 md:px-6 md:py-3 rounded-lg bg-[#111827] border border-gray-700 text-sm md:text-base font-semibold hover:bg-[#1a2333] transition shadow-lg"
          >
            Register
          </motion.button>
        </div>
      </motion.nav>

      {/* Hero */}
      <header className="flex items-center w-full px-4 md:px-12 py-10 md:py-16 flex-grow relative z-10">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="space-y-6 md:space-y-8 text-center md:text-left"
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
              Fix bugs faster. <br /> Ship cleaner code.
            </h2>
            <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto md:mx-0">
              Automatic, context-aware code reviews and bug finding for teams and
              solo developers. Works with your languages and workflows fast
              feedback, less manual testing.
            </p>

            <div className="flex flex-col sm:flex-row justify-center md:justify-start items-center gap-4 md:gap-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => onNavigate("register")}
                className="px-6 py-3 md:px-8 md:py-4 rounded-xl bg-[#0b1220] border border-gray-700 font-semibold shadow-lg hover:bg-[#101a2b] transition text-base md:text-lg w-full sm:w-auto"
              >
                Get Started
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => onNavigate("login")}
                className="px-6 py-3 md:px-7 md:py-4 rounded-xl border border-gray-700 text-gray-300 hover:bg-white/5 transition text-base md:text-lg w-full sm:w-auto"
              >
                Sign In
              </motion.button>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative scale-100 md:scale-110"
          >
            <motion.div
              whileHover={{ scale: 1.03, borderColor: "#3b82f6" }}
              className="relative rounded-2xl border border-gray-800 bg-[#07070b]/80 p-4 md:p-6 shadow-inner overflow-hidden transition backdrop-blur-md"
            >
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-red-500 inline-block"></span>
                  <span className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-yellow-400 inline-block"></span>
                  <span className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-green-500 inline-block"></span>
                </div>
                <div className="text-[10px] md:text-xs text-gray-500">
                  example.js
                </div>
              </div>

              <pre className="text-sm md:text-base leading-6 md:leading-7 rounded-md overflow-x-auto min-h-[100px] md:min-h-[120px]">
                <code className="block whitespace-pre-wrap text-gray-300 bg-transparent">
                  {displayedCode}
                  <span className="animate-pulse">|</span>
                </code>
              </pre>
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* Features */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-12 md:py-16 px-4 md:px-12 w-full relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="p-6 md:p-8 rounded-lg bg-[#0b0e13]/80 border border-gray-800 hover:border-blue-500/40 relative transition backdrop-blur-md"
            >
              <h3 className="font-semibold text-base md:text-lg mb-2 md:mb-3">
                {typedFeatures[i]?.title}
                {typedFeatures[i]?.title.length < f.title.length && (
                  <span className="animate-pulse">|</span>
                )}
              </h3>
              <p className="text-gray-400 text-sm md:text-base">
                {typedFeatures[i]?.desc}
                {typedFeatures[i]?.desc.length < f.desc.length && (
                  <span className="animate-pulse">|</span>
                )}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="mt-auto py-4 md:py-6 text-center text-xs md:text-sm text-gray-500 bg-[#0b0c10]/60 backdrop-blur-sm relative z-10">
        © {new Date().getFullYear()} CodeReviewer Bug Finder for devs.
      </footer>
    </div>
  );
}
