import { useState } from "react";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";

export default function AuthPage() {
  const [mode, setMode] = useState("login");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#d6d1c3]">

      {mode === "login" && (
        <Login switchToSignup={() => setMode("signup")} />
      )}

      {mode === "signup" && (
        <Signup switchToLogin={() => setMode("login")} />
      )}
    </div>
  );
}