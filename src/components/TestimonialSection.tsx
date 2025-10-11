import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Home2 from "/assets/videos/Home2.mp4";
import Ravi from "/assets/Images/Ravi.png";
import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

export const TestimonialSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <>
      {/* Fullscreen Background Video */}
      <div className="relative w-full h-screen">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          loop
          autoPlay
          muted
          playsInline
        >
          <source src={Home2} type="video/mp4" />
        </video>
      </div>

      {/* Heading outside the box */}
      <div
  className={`bg-white pt-10 pb-8 text-center transition-all duration-800 ${
    isVisible ? "animate-fade-in opacity-100" : "opacity-0 translate-y-8"
  }`}
>
  <h2 className="text-4xl font-semibold text-[#9f944a]">
    Heartfelt Gratitude
  </h2>
</div>


      {/* Outer white background section */}
      <section className="bg-white pb-28 px-4 flex justify-center items-center">

        {/* Inner peach box with sharp edges and reduced height */}
        <div className="bg-[#fbf9f6] shadow-lg p-10 max-w-7xl w-full">
          <div
            ref={ref}
            className="grid grid-cols-1 lg:grid-cols-2 gap-1 items-center"

          >
            {/* Image */}
            <div
              className={`transition-all duration-800 flex justify-center items-center ${
                isVisible
                  ? "animate-fade-in-left opacity-100"
                  : "opacity-0 -translate-x-8"
              }`}
            >
              <img
                src={Ravi}
                alt="Testimonial person"
                className="w-full max-w-[400px] object-cover grayscale transition-all duration-500 hover:grayscale-0 hover:scale-105"
              />
            </div>

            {/* Text */}
            <div
              className={`transition-all duration-800 delay-200 ${
                isVisible
                  ? "animate-fade-in-right opacity-100"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <div className="mb-4 text-[#b2a557] text-3xl">
                <FaQuoteLeft />
              </div>

              <blockquote className="text-justify text-gray-700 mb-6">
                Gurudev Sri Sri Ravi Shankar has united people of different
                races, traditions, economic and social status, and nationalities.
                This community, spanning 156 countries, has created a one-world
                spiritual family. Gurudev's message is simple: "Love and wisdom
                can prevail over hatred and violence." This message is not just a
                slogan — through The Art of Living, it continues to be translated
                into action and results.
              </blockquote>

              <cite className="text-gray-600">
                – Gurudev Sri Sri Ravi Shankar
              </cite>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
