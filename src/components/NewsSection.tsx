import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import MediaIMG1 from "/assets/Images/sss.png";
import MediaIMG2 from "/assets/Images/grp-22.png";
import MediaIMG3 from "/assets/Images/media-img-3.png";
import { Link } from "react-router-dom";

export const NewsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="pt-1 pb-28 bg-white">

      <div className="container mx-auto px-4">
        {/* Heading with consistent spacing */}
        <h2
          className={`text-4xl font-bold text-center text-[#9f944a] mb-12 md:mb-16 transition-all duration-800 ${
            isVisible ? "animate-fade-in opacity-100" : "opacity-0 translate-y-8"
          }`}
        >
          News and Media
        </h2>

        {/* Cards Grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {/* Card 1 */}
          <Link
            to="/newsMedia"
            className={`transition-all duration-800 delay-100 hover:shadow-lg hover:-translate-y-2 ${
              isVisible ? "animate-fade-in opacity-100" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="overflow-hidden transition-transform duration-300 hover:scale-105">
              <img
                src={MediaIMG1}
                alt="News 1"
                className="w-full h-80 object-cover object-top"
              />
              <div className="bg-[#1C3260] text-white px-5 pt-6 pb-6 text-center">
                <p className="text-lg font-normal max-w-[320px] mx-auto">
                  PLPB Partners with Surbana Jurong to Develop Punjab’s New Industrial Hub
                </p>
              </div>
            </div>
          </Link>

          {/* Card 2 */}
          <Link
            to="/newsMedia"
            className={`transition-all duration-800 delay-300 hover:shadow-lg hover:-translate-y-2 ${
              isVisible ? "animate-fade-in opacity-100" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="overflow-hidden transition-transform duration-300 hover:scale-105">
              <img
                src={MediaIMG2}
                alt="News 2"
                className="w-full h-80 object-top object-cover"
              />
              <div className="bg-[#1C3260] text-white px-5 pt-6 pb-14 text-center">
                <p className="text-lg font-normal max-w-[320px] mx-auto">
                  The Wellness City: Built for Life
                  <br/>
                  
                </p>
              </div>
            </div>
          </Link>

          {/* Card 3 */}
          <Link
            to="/newsMedia"
            className={`transition-all duration-800 delay-500 hover:shadow-lg hover:-translate-y-2 ${
              isVisible ? "animate-fade-in opacity-100" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="overflow-hidden transition-transform duration-300 hover:scale-105">
              <img
                src={MediaIMG3}
                alt="News 3"
                className="w-full h-80 object-top object-cover"
              />
              <div className="bg-[#1C3260] text-white px-5 pt-6 pb-6 text-center">
                <p className="text-lg font-normal max-w-[320px] mx-auto">
                  PLPB Leads the Way in Senior Living with Future-Ready Communities
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};
