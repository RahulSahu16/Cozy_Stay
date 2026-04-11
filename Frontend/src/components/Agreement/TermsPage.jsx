import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TermsPage = () => {
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!agree) return;
    localStorage.setItem("agreedToTerms", "true");
    navigate("/host-form");
  };

  return (
    <div className="min-h-screen bg-gradient bg-[#d6d1c3] to-gray-800 flex items-center justify-center px-4">

      <div className="max-w-2xl w-full bg-[#b9b4a5] backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20">

        {/* Heading */}
        <h2 className="text-3xl font-bold text-black mb-6 text-center">
          Terms & Conditions
        </h2>

        {/* Terms Box */}
        <div className="h-60 overflow-y-auto bg-black/5 border border-white/10 rounded-xl p-4 text-black text-sm leading-relaxed space-y-2">
          <p>• You must provide accurate property details</p>
          <p>• No illegal activities allowed</p>
          <p>• You are responsible for bookings</p>
          <p>• Platform is not liable for disputes</p>
          <p>• Misleading listings can be removed anytime</p>
          <p>• Users must respect guests and local laws</p>
        </div>

        {/* Checkbox */}
        <div className="flex items-center gap-3 mt-6">
          <input
            type="checkbox"
            onChange={(e) => setAgree(e.target.checked)}
            className="w-5 h-5 accent-blue-500 cursor-pointer"
          />
          <label className="text-gray text-sm">
            I agree to the Terms & Conditions
          </label>
        </div>

        {/* Button */}
        <button
          onClick={handleContinue}
          disabled={!agree}
          className={`w-full mt-6 py-3 rounded-xl font-semibold transition-all duration-300 
            ${
              agree
                ? "bg-[#d6d1c3] hover:bg-[#948b72] text-white shadow-lg"
                : "bg-gray-600 text-gray-300 cursor-not-allowed"
            }`}
        >
          Continue
        </button>

      </div>
    </div>
  );
};

export default TermsPage;