// import React from "react";

// const videoData = [
//   { id: "o1yjitQ3_xQ", title: "The Exclusive Dome of Luxury" },
//   { id: "feBMmwqzpbE", title: "Your Cocoon For A Contended Life" },
//   { id: "So1roVdq7h0", title: "A Masterpiece of Handcrafted Excellence" },
//   { id: "TEKiijSOm44", title: "Incorporating The Natural Landscape Into Step Gardens" },
//   { id: "ShQEW3Rd1Mo", title: "Separate Roads for Pedestrians & Vehicles" },
//   { id: "VApnPlvhSZA", title: "Backyard Garden- In Every Home To Enhance The Living Experience" },
//   { id: "iQL82DKuaEQ", title: "Revolutionary Clubhouse with 100+ Activities" },
//   { id: "mtVyEGNt0gc", title: "India's First & Only Bio- Climatic Living" },
//   { id: "m5wHqG1LvJg", title: "PLPB — 20 Minutes from International Airport Road" },
//   { id: "m3rheDEPRUA", title: "Surrounded By Renowned Educational Institute" },
//   { id: "RiXpL3ZewJY", title: "90 Acres of Carbon Negative Development" },
//   { id: "fCA7REB_tQM", title: "Frontage of 2000 ft. on Rajpura Highway (NH 7)" },
//   { id: "bWxly5JoGD8", title: "Evolving the Future of Living" },
//   { id: "Pfdo8uLBL7s", title: "Tickle Your Taste Buds Like Never Before." },
//   { id: "SzylVVoPHh4", title: "Witness The Matrimony of Mother Nature & Architectural Brilliance" },
//   { id: "6zeDOdDRvrQ", title: "Feel Life From Beneath Your Feet" },
//   { id: "xifO2OcwYz4", title: "Embrace A Life That Co- Exists In Accord" },
//   { id: "vnS6eqptY7k", title: "Hear Everything Come To Life" },
//   { id: "KzcL_zF6WYo", title: "Return To The Day Nature Intends Us." },
//   { id: "Yb_YlsRMETY", title: "Forgo the Metal and Artificiality of the city." },
//   { id: "a161fVN9mbs", title: "Marvel At The Magnificence Laid Perfectly Before Your Eyes" },
//   { id: "y3Sihmj28t8", title: "Everything you can Imagine is Real" },
// ];

// const Videos = () => {
//   return (
//     <div>
//       {/* Header */}
//       <div className="relative w-full h-[350px] md:h-[420px] flex items-center justify-center">
//         <img
//           src="/assets/Images/wellness city.png"
//           alt="Wellness City Background"
//           className="absolute inset-0 w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-black/40" />
//         <h1 className="relative z-10 text-white text-4xl md:text-6xl font-bold text-center">
      
//         </h1>
//       </div>

//       {/* Video Grid */}
//       <div className="max-w-7xl mx-auto px-4 py-12 max-sm:py-8">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-16 max-sm:flex max-sm:flex-col max-sm:items-center">
//           {videoData.map((video, idx) => {
//             if (idx >= 21 && idx <= 23 && idx !== 21) return null;
//             return (
//               <div
//                 key={video.id + idx}
//                 className="flex flex-col items-center w-full max-w-[360px] max-sm:w-[90%]"
//               >
//                 <div className="w-full aspect-square bg-black overflow-hidden border border-gray-300">
//                   <iframe
//                     src={`https://www.youtube.com/embed/${video.id}`}
//                     title={video.title}
//                     frameBorder="0"
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                     allowFullScreen
//                     className="w-full h-full"
//                   />
//                 </div>
//                 <p className="mt-3 text-center text-sm font-medium text-[#1c1c1c] leading-snug">
//                   {video.title}
//                 </p>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Videos;
import React from "react";
import { Helmet } from "react-helmet-async";

const videoData = [
  { id: "o1yjitQ3_xQ", title: "The Exclusive Dome of Luxury" },
  { id: "feBMmwqzpbE", title: "Your Cocoon For A Contended Life" },
  { id: "So1roVdq7h0", title: "A Masterpiece of Handcrafted Excellence" },
  { id: "TEKiijSOm44", title: "Incorporating The Natural Landscape Into Step Gardens" },
  { id: "ShQEW3Rd1Mo", title: "Separate Roads for Pedestrians & Vehicles" },
  { id: "VApnPlvhSZA", title: "Backyard Garden- In Every Home To Enhance The Living Experience" },
  { id: "iQL82DKuaEQ", title: "Revolutionary Clubhouse with 100+ Activities" },
  { id: "mtVyEGNt0gc", title: "India's First & Only Bio- Climatic Living" },
  { id: "m5wHqG1LvJg", title: "PLPB — 20 Minutes from International Airport Road" },
  { id: "m3rheDEPRUA", title: "Surrounded By Renowned Educational Institute" },
  { id: "RiXpL3ZewJY", title: "90 Acres of Carbon Negative Development" },
  { id: "fCA7REB_tQM", title: "Frontage of 2000 ft. on Rajpura Highway (NH 7)" },
  { id: "bWxly5JoGD8", title: "Evolving the Future of Living" },
  { id: "Pfdo8uLBL7s", title: "Tickle Your Taste Buds Like Never Before." },
  { id: "SzylVVoPHh4", title: "Witness The Matrimony of Mother Nature & Architectural Brilliance" },
  { id: "6zeDOdDRvrQ", title: "Feel Life From Beneath Your Feet" },
  { id: "xifO2OcwYz4", title: "Embrace A Life That Co- Exists In Accord" },
  { id: "vnS6eqptY7k", title: "Hear Everything Come To Life" },
  { id: "KzcL_zF6WYo", title: "Return To The Day Nature Intends Us." },
  { id: "Yb_YlsRMETY", title: "Forgo the Metal and Artificiality of the city." },
  { id: "a161fVN9mbs", title: "Marvel At The Magnificence Laid Perfectly Before Your Eyes" },
  { id: "y3Sihmj28t8", title: "Everything you can Imagine is Real" },
];

const Videos = () => {
  return (
    <div>
      <Helmet>
        <title>PLPB Group: Our Project Videos</title>
        <meta
          name="description"
          content="Watch PLPB Group’s videos showcasing projects, events, and milestones in our real estate journey."
        />
      </Helmet>

      {/* Header */}
      <div className="relative w-full h-[350px] md:h-[420px] flex items-center justify-center">
        <img
          src="/assets/Images/wellness city.png"
          alt="Wellness City Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <h1 className="relative z-10 text-white text-4xl md:text-6xl font-bold text-center"></h1>
      </div>

      {/* Video Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 max-sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-16 max-sm:flex max-sm:flex-col max-sm:items-center">
          {videoData.map((video, idx) => {
            if (idx >= 21 && idx <= 23 && idx !== 21) return null;
            return (
              <div
                key={video.id + idx}
                className="flex flex-col items-center w-full max-w-[360px] max-sm:w-[90%]"
              >
                <div className="w-full aspect-square bg-black overflow-hidden border border-gray-300">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <p className="mt-3 text-center text-sm font-medium text-[#1c1c1c] leading-snug">
                  {video.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Videos;
