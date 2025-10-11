// import AboutHero from "@/components/AboutHero";
// // import AboutIntro from "@/components/AboutIntro";
// import AboutMissionSection from "@/components/AboutMissionSection";
// import AboutTeamSection from "@/components/AboutTeamSection";
// import AboutVisionSection from "@/components/AboutVisionSection";
// const AboutUs = () => {
//   return (
//     <div className="min-h-screen bg-background">
//       <AboutHero />
//       {/* <AboutIntro /> */}
//       <AboutVisionSection />
//       <AboutMissionSection />
//       <AboutTeamSection />
//     </div>
//   );
// };

// export default AboutUs;
import { Helmet } from "react-helmet-async";
import AboutHero from "@/components/AboutHero";
// import AboutIntro from "@/components/AboutIntro";
import AboutMissionSection from "@/components/AboutMissionSection";
import AboutTeamSection from "@/components/AboutTeamSection";
import AboutVisionSection from "@/components/AboutVisionSection";

const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>PLPB Group: Building With Clarity, Care, & Purpose</title>
        <meta
          name="description"
          content="Learn about PLPB Group’s vision, legacy, and commitment to creating exceptional real estate developments."
        />
        <meta
          name="keywords"
          content="about plpb, plpb about us, plpb directors"
        />
        <link rel="canonical" href="https://plpb.in/aboutus" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <AboutHero />
        {/* <AboutIntro /> */}
        <AboutVisionSection />
        <AboutMissionSection />
        <AboutTeamSection />
      </div>
    </>
  );
};

export default AboutUs;

