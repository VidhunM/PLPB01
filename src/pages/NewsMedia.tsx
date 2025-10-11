// import PLPBPressPage from "@/components/PLPBPressPage";
// import React from "react";
// import Videos from "@/components/videos";

// const NewsMedia = () => {
//   return (
//     <div>
//       <PLPBPressPage />
//       {/* <Videos /> */}
//     </div>
//   );
// };

// export default NewsMedia;
import { Helmet } from "react-helmet-async";
import PLPBPressPage from "@/components/PLPBPressPage";
import React from "react";
import Videos from "@/components/videos";

const NewsMedia = () => {
  return (
    <>
      <Helmet>
        <title>PLPB Group: Latest News & Updates</title>
        <meta
          name="description"
          content="Explore PLPB Group’s latest press releases, media coverage, and official news updates."
        />
        <meta
          name="keywords"
          content="plpb news, plpb news and media, pressrelease"
        />
        <link rel="canonical" href="https://plpb.in/newsMedia" />
      </Helmet>

      <div>
        <PLPBPressPage />
        {/* <Videos /> */}
      </div>
    </>
  );
};

export default NewsMedia;
