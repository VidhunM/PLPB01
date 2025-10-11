import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const StatsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-16 bg-[#FBF9F6]">
      <div
        ref={ref}
        className="container mx-auto px-6 md:px-10 lg:px-16 flex flex-col md:flex-row md:items-start gap-12"
      >
        {/* Stat 1 */}
        <div
          className={`transition-all duration-700 delay-100 w-full md:w-1/4 ${
            isVisible ? "animate-fade-in opacity-100" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center">
            <h3 className="text-4xl text-[#b2a557] font-bold mb-1 leading-none">
              30+ Years
            </h3>
            <div className="w-full">
              <div className="border-t border-gray-300 mb-1 w-[75%] mx-auto"></div>
              <p className="text-sm text-[#1c1c1c] tracking-wide">
                OF SHARED EXPERIENCE
              </p>
            </div>
          </div>
        </div>

        {/* Stat 2 */}
        <div
          className={`transition-all duration-700 delay-100 w-full md:w-1/4 ${
            isVisible ? "animate-fade-in opacity-100" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center">
            <h3 className="text-4xl text-[#b2a557] font-bold mb-1 leading-none">
              International
            </h3>
            <div className="w-full">
              <div className="border-t border-gray-300 mb-1 w-[75%] mx-auto"></div>
              <p className="text-sm text-[#1c1c1c] tracking-wide">
                PARTNERS & DESIGNERS
              </p>
            </div>
          </div>
        </div>

        {/* Paragraph Text */}
        <div
          className={`transition-all duration-700 delay-500 w-full md:w-2/4 ${
            isVisible ? "animate-fade-in opacity-100" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-gray-600 mb-6">
            At PLPB, our vision is only enhanced by the equally visionary partners.
            Together we are committed to creating world-class residential, commercial &amp;
            mixed use developments that enhance our way of life.
          </p>
        </div>
      </div>
    </section>
  );
};
