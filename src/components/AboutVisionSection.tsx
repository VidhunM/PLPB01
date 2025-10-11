import React from "react";

import visionImage from "/assets/Images/OurVision.jpg";

const AboutVisionSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-pipb-brown mb-8">
              Our Vision
            </h2>
            <div className="space-y-4">
              <p className="text-muted-foreground text-lg leading-relaxed">
                To redefine real estate by building with clarity, care, and
                purpose — creating places that feel rooted, lasting, and
                naturally a part of life.
              </p>
              {/* <p className="text-muted-foreground leading-relaxed">
                We envision a future where sustainable communities become the
                norm rather than the exception, where every development
                contributes positively to the environment while enhancing the
                quality of life for residents.
              </p> */}
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <img
                src={visionImage}
                alt="Our Vision - Sustainable Innovation"
                className="rounded-lg shadow-lg max-w-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutVisionSection;
