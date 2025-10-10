import React from "react";
import { BsClockHistory } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function ComingSoon() {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4">
      <BsClockHistory className="text-6xl text-green-500 mb-6 animate-pulse" />
      <h1 className="text-5xl md:text-6xl font-bold mb-4 text-green-500">Coming Soon</h1>
      <p className="text-center text-lg md:text-xl text-gray-300 max-w-xl mb-8">
        We’re working hard to bring you something amazing! Stay tuned and get ready for an exciting launch.
      </p>
      <button
        onClick={() => window.location.href = "/"}
        className="px-6 py-3 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-lg transition"
      >
        Back to Home
      </button>
    </div>
  );
}
