import React, { useRef, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

import BannerVideo from "/assets/videos/Home.mp4";
import PlayIcon from "/assets/Images/HeroPlayvideo.png";

export const HeroSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  return (
    <section className="relative h-screen w-full flex items-end justify-start bg-gradient-to-r from-gray-900 to-gray-700 overflow-hidden">
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000"
        loop
        autoPlay
        muted
        playsInline
      >
        <source src={BannerVideo} type="video/mp4" />
      </video>
      {/* Play Video CTA Overlay removed */}
      <div ref={ref} className="relative z-10 container mx-auto px-4 pb-6">
        <div className="max-w-2xl">
          <h1
            className={`text-5xl  lg:text-8xl tracking-wider text-white mb-4 transition-all duration-1000 ${
              isVisible
                ? "animate-slide-up opacity-100"
                : "opacity-0 translate-y-8"
            }`}
          >
            Reimagining
          </h1>
          <p
  className={`text-xl lg:text-4xl font-light tracking-wide text-white/90 mb-8 transition-all duration-1000 delay-300 custom-font ${
    isVisible ? "animate-slide-up opacity-100" : "opacity-0 translate-y-8"
  }`}
>
  space, comfort, and connection
</p>

        </div>
      </div>
    </section>
  );
};
