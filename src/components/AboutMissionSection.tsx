import missionImage from "/assets/Images/OurMission.jpg";

const AboutMissionSection = () => {
  return (
    <section className="py-20 bg-pipb-beige">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              <img
                src={missionImage}
                alt="Our Mission - Sustainable Building"
                className="rounded-lg shadow-lg max-w-2xl w-full h-auto"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-pipb-brown mb-8">
              Our Mission
            </h2>
            <div className="space-y-4">
              <p className="text-muted-foreground text-lg leading-relaxed">
                To design homes and industrial spaces that are thoughtful in
                form and lasting in value — where nature is centre to how every
                space is built.
              </p>
              {/* <p className="text-muted-foreground leading-relaxed">
                We are committed to innovative design solutions that minimize
                environmental impact while maximizing community well-being,
                creating spaces where people and nature thrive together.
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMissionSection;
