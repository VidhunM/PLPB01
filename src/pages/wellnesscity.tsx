// import WellnessCitySec from "../components/wellnesscitysec";

// const WellnessCity = () => <WellnessCitySec />;

// export default WellnessCity;
import { Helmet } from "react-helmet-async";
import WellnessCitySec from "../components/wellnesscitysec";

const WellnessCity = () => {
  return (
    <>
      <Helmet>
        <title>PLPB Group: Building India's First Bioclimatic Township</title>
        <meta
          name="description"
          content="Experience The Wellness City by PLPB, a township designed for healthy, balanced, and sustainable living."
        />
        <meta
          name="keywords"
          content="the wellnesscity, TWC, Bioclimatic township"
        />
        <link rel="canonical" href="https://plpb.in/wellnesscity" />
      </Helmet>

      <WellnessCitySec />
    </>
  );
};

export default WellnessCity;
