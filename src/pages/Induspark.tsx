// import React from "react";
// import { Link } from 'react-router-dom';


// const Induspark = () => {
//   return (
//     <div className="relative w-screen h-screen overflow-hidden">
//       {/* Fullscreen Video */}
//       <video
//         src="/assets/videos/Banner of IndusPark Page.mp4"
//         className="absolute top-0 left-0 w-full h-full object-cover z-0"
//         autoPlay
//         loop
        
//         playsInline
//       />

//       {/* Overlayed ENQUIRE Button (centered at bottom) */}
      
//       <div className="absolute bottom-12 left-0 w-full flex justify-center z-10">
        
//   <Link to="/contactus">
//     <button
//       className="bg-white text-[#1C3260] rounded-xl px-8 py-3 font-bold text-lg shadow-md hover:bg-[#1C3260] hover:text-white transition-all duration-200 flex flex-col items-center leading-tight"
//     >
//       <span className="text-lg font-bold">ENQUIRE</span>
//     </button>
//   </Link>

//       </div>
//     </div>
//   );
// };

// export default Induspark; 
import { Helmet } from "react-helmet-async";
import { Link } from 'react-router-dom';

const Induspark = () => {
  return (
    <>
      <Helmet>
        <title>PLPB Group: Rising Industries Empowering Dreams</title>
        <meta
          name="description"
          content="IndusPark by PLPB offers world-class industrial spaces designed for growth, innovation, and business success."
        />
        <meta
          name="keywords"
          content="industrial park, induspark"
        />
        <link rel="canonical" href="https://plpb.in/induspark" />
      </Helmet>

      <div className="relative w-screen h-screen overflow-hidden">
        {/* Fullscreen Video */}
        <video
          src="/assets/videos/Banner of IndusPark Page.mp4"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          playsInline
        />

        {/* Overlayed ENQUIRE Button (centered at bottom) */}
        <div className="absolute bottom-12 left-0 w-full flex justify-center z-10">
          <Link to="/contactus">
            <button
              className="bg-white text-[#1C3260] rounded-xl px-8 py-3 font-bold text-lg shadow-md hover:bg-[#1C3260] hover:text-white transition-all duration-200 flex flex-col items-center leading-tight"
            >
              <span className="text-lg font-bold">ENQUIRE</span>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Induspark;
