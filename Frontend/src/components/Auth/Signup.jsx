import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendOtp, verifyOtp, signup } from "../../api/axios";

export default function Signup({ switchToLogin }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!email) {
      setMessage("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);
      const data = await sendOtp(email);
      setMessage(data.message || "OTP has been sent.");
      setStep(2);
    } catch (error) {
      setMessage(
        error.response?.data?.message || error.message || "Failed to send OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setMessage("Please enter the OTP.");
      return;
    }

    try {
      setLoading(true);
      const data = await verifyOtp(email, otp);
      setMessage(data.message || "OTP verified.");
      setStep(3);
    } catch (error) {
      setMessage(
        error.response?.data?.message || error.message || "Failed to verify OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = async () => {
    if (!name || !password || !confirmPassword) {
      setMessage("Please fill in name and both password fields.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const data = await signup(name, email, password);
      localStorage.setItem("authUser", JSON.stringify(data.user));
      localStorage.setItem("authToken", data.token);
      window.dispatchEvent(new Event("authChanged"));
      navigate("/");
    } catch (error) {
      setMessage(
        error.response?.data?.message || error.message || "Failed to create account."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-semibold text-center mb-6">
        Signup
      </h2>

      {message && (
        <div className="mb-4 rounded-lg border border-yellow-300 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
          {message}
        </div>
      )}

      {/* STEP 1 — EMAIL */}
      {step === 1 && (
        <>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleSendOtp}
            disabled={loading}
            className="w-full bg-[#836f39] text-white py-2 rounded-lg hover:bg-[#493a0f] transition disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </>
      )}

      {/* STEP 2 — OTP */}
      {step === 2 && (
        <>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleVerifyOtp}
            disabled={loading}
            className="w-full bg-[#836f39] text-white py-2 rounded-lg hover:bg-[#493a0f] transition disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Verifying OTP..." : "Verify OTP"}
          </button>
        </>
      )}

      {/* STEP 3 — PASSWORD */}
      {step === 3 && (
        <>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create password"
            className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleCreateAccount}
            disabled={loading}
            className="w-full bg-[#836f39] text-white py-2 rounded-lg hover:bg-[#493a0f] transition disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </>
      )}

      {/* Divider */}
      <div className="flex items-center my-5">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="px-3 text-gray-500 text-sm">or</span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      {/* Google Signup */}
      <button className="w-full border py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100">
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          className="w-5 h-5"
        />
        Signup with Google
      </button>

      {/* Switch */}
      <p className="text-center text-sm mt-5">
        Already have an account?{" "}
        <span
          onClick={switchToLogin}
          className="text-blue-500 cursor-pointer hover:underline"
        >
          Login
        </span>
      </p>
    </div>
  );
}