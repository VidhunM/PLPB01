import { useState } from "react";
import ContactUsForm from "./ContactUsForm";

export const GetInTouchButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleSheet = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleSheet}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          fixed top-1/2 z-50 -translate-y-1/2
          border-2 border-[#d6b24c] bg-transparent
          px-4 py-3 text-[16px] font-bold uppercase
          flex items-center justify-center
          overflow-hidden group
          transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]
          ${isOpen ? "right-[420px]" : "right-0"}
          w-[40px] h-[240px]
        `}
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          transform: "rotate(540deg)",
          letterSpacing: "0.2em",
          boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* Top-to-bottom fill animation */}
        <span
          className={`
            absolute inset-0 bg-gradient-to-b from-[#b8932e] to-[#b2a557] z-0
            ${isHovered ? "animate-fill-down" : "translate-y-[-100%]"}
            transition-transform duration-1000
          `}
        />

        {/* Shine effect */}
        {isHovered && (
          <span
            className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-white/30 to-transparent z-10"
            style={{
              animation: "shine 1.8s ease-in-out infinite",
              transformOrigin: "top",
            }}
          />
        )}

        {/* Text */}
        <span
          className={`
            relative z-20 transition-all duration-700 ease-in-out
            ${isHovered
              ? "text-white translate-y-0 opacity-100"
              : "text-[#d6b24c] translate-y-4 opacity-60"}
          `}
          style={{
            textShadow: isHovered ? "0 0 5px rgba(0,0,0,0.3)" : "none",
          }}
        >
          GET IN TOUCH
        </span>

        {/* Reflective overlay */}
        <span
          className={`
            absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent
            z-10 opacity-0 transition-opacity duration-600
            ${isHovered ? "opacity-40" : ""}
          `}
          style={{
            transform: "rotate(-20deg)",
            width: "150%",
            top: "-25%",
          }}
        />
      </button>

      {/* Contact Panel */}
      <div
        className={`
          fixed top-0 right-0 h-screen w-full md:w-[420px] bg-white z-40
          shadow-xl px-6 py-8 overflow-y-auto transition-transform duration-500
          ease-[cubic-bezier(0.65,0,0.35,1)]
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <h2 className="text-[28px] font-medium text-gray-900 mb-6">Contact Us</h2>
        <ContactUsForm />
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes shine {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          50% {
            transform: translateY(0%);
            opacity: 1;
          }
          100% {
            transform: translateY(100%);
            opacity: 0;
          }
        }

        @keyframes fill-down {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(0%);
          }
        }

        .animate-fill-down {
          animation: fill-down 1.2s forwards ease-in-out;
        }
      `}</style>
    </>
  );
};