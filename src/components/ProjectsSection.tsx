import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

import bannerimg2 from "/assets/Images/banner-img-2.png";
import WellnessCity from "/assets/Images/wellness city.jpg";
import Induspark from "/assets/Images/iStock-1450384722.jpg";
import IndusparkLogo from "/assets/Images/induspark logo.svg";
import DesignImg from "/assets/Images/well.svg";

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const ProjectsSection = () => {
  const { ref: ref1, isVisible: isVisible1 } = useScrollAnimation();
  const { ref: ref2, isVisible: isVisible2 } = useScrollAnimation();
  const { ref: ref3, isVisible: isVisible3 } = useScrollAnimation();

  return (
    <section className="py-16 bg-gray-50 text-justify">
      <div className="container mx-auto px-4">

        {/* Introduction */}
        <div ref={ref1} className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div
            className={`transition-all duration-800 ${
              isVisible1 ? "animate-fade-in-left opacity-100" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="border-l-2 border-[#78602C] pl-4">
              <h2 className="text-4xl font-medium mb-6">Building the Future, Thoughtfully</h2>
            </div>
            <p className="text-gray-600 mb-6">
              At Prime Land Promoters & Builders, we don’t just build homes — we
              plan environments that help people live better. With over 30+ years
              of experience in land development and real estate, our focus has
              always been long-term: what makes a home liveable, a township
              sustainable, and a neighbourhood truly feel like one.
            </p>
            <p className="text-gray-600">
              From India’s first bioclimatic township to projects shaped by
              light, air, and ease, we design with care — not clutter. Our work
              is led by purpose, rooted in trust, and backed by a deep
              understanding of how people want to live now — and how that may
              change tomorrow.
            </p>
            <br />
            <p className="text-gray-600">
              Every project is a step toward a calmer, smarter, more balanced
              way of life.
            </p>
          </div>
          <div
            className={`transition-all duration-800 delay-200 ${
              isVisible1 ? "animate-fade-in-right opacity-100" : "opacity-0 translate-x-8"
            }`}
          >
            <img
              src={bannerimg2}
              alt="Modern development project"
              className="w-full h-96 object-cover rounded-lg transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>

        {/* Wellness City */}
        <div ref={ref2} className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div
            className={`transition-all duration-800 ${
              isVisible2 ? "animate-fade-in-left opacity-100" : "opacity-0 -translate-x-8"
            }`}
          >
            <img
              src={WellnessCity}
              alt="Wellness city project"
              className="w-full h-96 object-cover rounded-lg transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div
            className={`flex items-start transition-all duration-800 delay-200 ${
              isVisible2 ? "animate-fade-in-right opacity-100" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="mt-4">
              <img
                src={DesignImg}
                alt="Wellness City Logo"
                width={180} // slightly larger
                className="mb-4"
              />
              <p className="text-gray-600">
                A revolutionary development in contemporary Real Estate. Located
                on a pristine land parcel of over 90 acres on the Mohali-Rajpura
                highway, The Wellness City is India's first large-scale real
                estate development project that will focus on holistic
                wellbeing. Designed and planned by applying the principles of
                bioclimatic architecture, the philosophy is to develop a
                community in harmony with nature and not against it.
              </p>
              <Link
                to={"/wellnesscity"}
                className="flex items-center gap-2 mt-2 text-[#78602C]"
              >
                Experience Wellness <ArrowRight className="h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Induspark */}
        <div ref={ref3} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div
            className={`transition-all duration-800 ${
              isVisible3 ? "animate-fade-in-left opacity-100" : "opacity-0 -translate-x-8"
            }`}
          >
            <img
              src={Induspark}
              alt="Induspark project"
              className="w-full h-96 object-cover rounded-lg transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div
            className={`flex items-start transition-all duration-800 delay-200 ${
              isVisible3 ? "animate-fade-in-right opacity-100" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="mt-4">
              <img
                src={IndusparkLogo}
                alt="Induspark Logo"
                width={180} // slightly larger
                className="mb-4"
              />
              <p className="text-gray-600">
                A modern industrial ecosystem built for efficiency and scale.
                Induspark is a future-ready development tailored for innovation,
                logistics, and manufacturing excellence. Strategically located
                with superior infrastructure, it enables industries to thrive
                while offering harmony with the environment.
              </p>
              <Link
                to={"/Induspark"}
                className="flex items-center gap-2 mt-2 text-[#78602C]"
              >
                Experience Growth <ArrowRight className="h-4" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
