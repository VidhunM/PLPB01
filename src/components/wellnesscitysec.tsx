import React, { useEffect, useState } from "react";

const WellnessCitysec = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const triggerPosition = window.innerHeight * 0.8;
      
      if (scrollPosition > triggerPosition) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* Video Background Section */}
      <div className="relative min-h-screen">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/assets/videos/wellnessproject.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60" />
        <div className="relative z-10 flex flex-col items-center justify-center h-screen">
          {/* <h1 className="text-white text-6xl font-light tracking-widest mt-40">
          </h1> */}
        </div>
      </div>

      {/* Tree Image Section with Overlay Card */}
      <div className="relative py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center relative">
            <img
              src="/assets/Images/wellness city.jpg"
              alt="Wellness City Tree"
              className="max-w-3xl w-full h-[500px] rounded-lg shadow-lg -ml-40"
            />
            
            {/* Wellness City Card - Appears on scroll */}
            <div 
              className={`absolute top-1/2 right-8 transform -translate-y-1/2 transition-all duration-1000 ease-out ${
                isVisible 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-20'
              }`}
            >
              <div className="bg-[#fbf9f6] p-10 max-w-lg">
                                 <div className="flex flex-col items-left mb-0">
                   <div className="w-48 h-48 mb-0">
                     <img 
                       src="/assets/Images/well.svg" 
                       alt="Wellness City Logo" 
                       className="w-full h-full object-contain"
                     />
                   </div>
                 </div>
                 
                                  <p className="text-gray-600 text-base leading-relaxed -mt-8">
                   A revolutionary development in contemporary Real Estate. Located on a pristine land parcel of over 90 acres on the Mohali-Rajpura highway, The Wellness City is India's first large-scale real estate development project that will focus on holistic wellbeing. Designed and planned by applying the principles of bioclimatic architecture, the philosophy is to develop a community in harmony with nature and not against it.
                 </p>
                
                <div className="flex flex-col gap-2">
                  <a 
                    href="https://www.thewellnesscity.in/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#78602C] font-medium text-base transition-colors duration-200"
                  >
                    Experience Wellness →
                  </a>
                  <a 
                    href="https://github.com/your-repo-link" // Replace with your real repo link
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-gray-700 hover:text-gray-900 font-medium text-base transition-colors duration-200"
                  >
                  
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default WellnessCitysec;