import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import "./index.css";

function Main() {
  const [auth, setAuth] = useState(!!localStorage.getItem("token"));
  const [isRegister, setIsRegister] = useState(false);
  const [page, setPage] = useState("landing");

  // Handle authentication state change
  const handleAuth = (status) => {
    setAuth(status);
    if (status) {
      setPage("review");
    } else {
      setPage("login");
    }
  };

  // Handle register toggle
  const handleSetIsRegister = (flag) => {
    setIsRegister(flag);
    setPage(flag ? "register" : "login");
  };

  // ✅ Authenticated → Show Code Reviewer
  if (auth && page === "review") {
    return <App setAuth={handleAuth} />;
  }

  // ✅ Not logged in - Show Landing page
  if (page === "landing") {
    return (
      <Landing
        onNavigate={(target) => {
          if (target === "login") {
            setIsRegister(false);
            setPage("login");
          }
          if (target === "register") {
            setIsRegister(true);
            setPage("register");
          }
        }}
      />
    );
  }

  // ✅ Show Login/Register
  return isRegister ? (
    <Register setAuth={handleAuth} setIsRegister={handleSetIsRegister} />
  ) : (
    <Login setAuth={handleAuth} setIsRegister={handleSetIsRegister} />
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
