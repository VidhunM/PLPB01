import { FaQuoteLeft } from "react-icons/fa";

const AboutTeamSection = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Sanjiv Singla",
      image: "/assets/Images/SanjivSingala.jpg",
      quote:
        "We are delighted to bring The Wellness City to the citizens of Punjab. The city is a beautiful combination of progressive wellness planning and living with nature. It is our vision to deliver a peaceful environment where citizens are mentally at peace and physically fit, living in harmony with nature. We have worked closely with wellness architects, landscape designers, and vastu experts to bring this vision to life. The Wellness City is a living example of how people can live in a manner that is grounded, fulfilling, and future-ready.",
    },
    {
      id: 2,
      name: "Devraj Bansal",
      image: "/assets/Images/DevrajBansal.png",
      quote:
        "The Wellness City give the region exactly what is needed - a large scale real estate development project that delivers the next evolutionary step in living. We determined to provide a solution for every type of Home Buyer. At the same time, a strong Focus on the holistic wellbeing of every resident. We are inspired by the 8 Pillars of Wellness, and have tried to ensure harmony between each of them by prudently incorporating the 5 Elements of Nature. The end result, we hope is one that is able to help you and your loved ones achieve your goals of holistic wellbeing.",
    },
    {
      id: 3,
      name: "Sumit Singla",
      image: "/assets/Images/SumitSingla.png",
      quote:
        "The Wellness City truly speaks for itself: a testament to thoughtful planning, a sanctuary of nature, and a design crafted for inner peace. Our team's purpose has been to infuse every brick, every tree, and every corner with wellness and sustainability. We aren't just constructing buildings; we're cultivating a lifestyle. It's our hope that families and future generations will deeply thrive in and cherish the profound harmony this city provides.",
    },
    {
      id: 4,
      name: "Lohit Bansal",
      image: "/assets/Images/LohitBansal.png",
      quote:
        "The Wellness City is a meaningful and practical response to the growing demand for mental calm and healthier living. We're convinced the future belongs to those who prioritize wellness now. Each element of our city is thoughtfully designed from inviting walkways to serene spaces for reading or reflection. Our intent is to help people integrate mindfulness into their daily routines and discover the joy of simple living within a contemporary environment.",
    },
    {
      id: 5,
      name: "Sahil Bansal",
      image: "/assets/Images/SahilBansal.png",
      quote:
        "Each aspect of construction is focused on environmental consciousness. We are investing in tomorrow by designing smarter infrastructure that blends wellness, convenience, and sustainability. The Wellness City is an answer to what our next generation truly needs: clean air, smart living, and conscious choices. We are proud to contribute to a project that will stand tall as a benchmark of responsible living for years to come.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-[#9f944a] mb-12">
          Led With Purpose
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className={`flex flex-col md:flex-row bg-[#FBF9F6] shadow-md overflow-hidden ${
                index === 4
                  ? "md:col-span-2 md:mx-auto md:w-1/2"
                  : ""
              }`}
            >
              {/* Image Section */}
              <div className="w-full md:w-1/2">
                <img
                  src={member.image}
                  alt={member.name}
                  className={`w-full h-auto md:h-full object-cover ${
                    index === 3 ? "object-top" : ""
                  }`}
                />
              </div>

              {/* Text Section */}
              <div
                className={`w-full md:w-1/2 px-5 py-5 flex justify-center items-start text-justify`}
              >
                <div>
                  <div className="text-[#b2a557] text-lg md:text-xl mb-3">
                    <FaQuoteLeft />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    {member.quote}
                  </p>
                  <p className="text-sm md:text-lg font-semibold text-pipb-brown">
                    {member.name}
                  </p>
                  <p className="text-muted-foreground text-xs">Partner</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTeamSection;
