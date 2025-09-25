import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";  // 👈 NEW
import "./index.css";

function Main() {
  const [auth, setAuth] = useState(!!localStorage.getItem("token"));
  const [isRegister, setIsRegister] = useState(false);
  const [page, setPage] = useState("landing"); // 👈 control which screen

  // ✅ Authenticated → Show Code Reviewer
  if (auth) {
    return <App />;
  }

  // ✅ Not logged in
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
    <Register setAuth={setAuth} setIsRegister={setIsRegister} />
  ) : (
    <Login setAuth={setAuth} setIsRegister={setIsRegister} />
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
