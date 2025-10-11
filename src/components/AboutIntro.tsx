import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutVideo from "/assets/videos/Construction.mp4";

const AboutHero = () => {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.set(".state-icon", { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".about-banner-text",
        pin: true,
        start: "top 40%",
        end: "+=600vh",
        scrub: true,
        onLeave: () => {
          gsap.to(".state-icon", {
            opacity: 1,
            ease: "power2.out",
            duration: 1,
            scrollTrigger: {
              trigger: ".about-stats",
              scrub: true,
            },
          });
        },
      },
    });

    tl.to(
      ".about-banner-text",
      {
        scale: 0.8,
        color: "black",
        duration: 2,
        ease: "power2.out",
      },
      0
    );

    tl.to(
      ".about-banner-text span",
      {
        scale: 0.8,
        color: "#B9995A",
        duration: 2,
        ease: "power2.out",
      },
      0
    );
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000"
          loop
          autoPlay
          muted
          playsInline
        >
          <source src={AboutVideo} type="video/mp4" />
        </video>

        {/* Banner Text */}
        <div className="about-banner-text relative z-10 text-center text-white px-4 max-w-4xl mx-auto tracking-wide">
          <div className="text-base sm:text-2xl md:text-3xl lg:text-4xl font-normal">
            <div className="text-pipb-green">
              DEVELOPING <span className="text-white">SUSTAINABLE COMMUNITIES</span>
            </div>
            <div className="text-pipb-brown">THAT CAN CO-EXIST WITH NATURE</div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="about-stats h-auto py-16 flex justify-center items-center bg-[#fbf9f6]">
        <div className="container mx-auto px-4 text-center">
          {/* Logo */}
          <div className="mb-8 md:mb-20"> {/* Changed from mb-1 to mb-8 for better mobile spacing */}
            <img
              src="/assets/Images/PLPB_Blue.png"
              alt="PLPB Logo"
              className="mx-auto h-[27px] state-icon"
            />
          </div>

          {/* Description */}
          <div className="max-w-4xl mx-auto">
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              At PLPB we are committed to creating playgrounds for the future, where nature
              plays host to you & your family. Fuelled with our passion for creating sustainable
              environments, PLPB partners with the world's best architects and designers to
              create communities that coexist in harmony with their surroundings.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutHero;