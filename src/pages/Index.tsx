// import { Header } from "@/components/Header";
// import { HeroSection } from "@/components/HeroSection";
// import { StatsSection } from "@/components/StatsSection";
// import { ProjectsSection } from "@/components/ProjectsSection";
// import { TestimonialSection } from "@/components/TestimonialSection";
// import { NewsSection } from "@/components/NewsSection";
// import { Footer } from "@/components/Footer";

// const Index = () => {
//   return (
//     <div className="min-h-screen bg-background">
//       {/* <Header /> */}
//       <HeroSection />
//       <StatsSection />
//       <ProjectsSection />
//       <TestimonialSection />
//       <NewsSection />
//       {/* <Footer /> */}
//     </div>
//   );
// };

// export default Index;
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { StatsSection } from "@/components/StatsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { TestimonialSection } from "@/components/TestimonialSection";
import { NewsSection } from "@/components/NewsSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>PLPB Group: Top Builders & Real Estate Developers in Chandigarh</title>
        <meta
          name="description"
          content="Discover PLPB Group’s real estate excellence with projects built on trust, innovation, and customer satisfaction."
        />
        <meta
          name="keywords"
          content="PLPB group, plpb infra, prime land promoter and builders"
        />
        <link rel="canonical" href="https://plpb.in/" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* <Header /> */}
        <HeroSection />
        <StatsSection />
        <ProjectsSection />
        <TestimonialSection />
        <NewsSection />
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Index;

