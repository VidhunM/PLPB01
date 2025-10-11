import React from "react";
import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="absolute top-8 left-8">
        <img src="/assets/Images/PLPB.png" alt="PLPB Logo" className="h-12" />
      </div>
      <div className="text-center">
        <h2 className="text-4xl font-bold text-[#d6b24c] mb-4">All Set!</h2>
        <h1 className="text-2xl font-semibold text-[#0f2c5f] mb-2">Thank You For Sharing Your Information</h1>
        <p className="text-gray-600 mb-6">
          We have received your appointment request.
          <br />
          You will be notified shortly via SMS once the request is approved.
        </p>
        <Link to="/" className="inline-block bg-[#d6b24c] text-white font-semibold py-3 px-8 rounded-full text-sm tracking-wide uppercase shadow-lg hover:bg-[#c0a040] transition duration-300">
          BACK TO HOME PAGE
        </Link>
        <p className="text-gray-700 mt-6">Call Us On: <span className="font-semibold">+91 92094-93094</span></p>
      </div>
    </div>
  );
};

export default ThankYou;