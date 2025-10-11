// import React from "react";
// import EMICalculator from "../components/EMICalculator";

// const EMICalculatorPage = () => {
//   return (
//     <div >
//       <EMICalculator />
//     </div>
//   );
// };

// export default EMICalculatorPage; 
import { Helmet } from "react-helmet-async";
import EMICalculator from "../components/EMICalculator";

const EMICalculatorPage = () => {
  return (
    <>
      <Helmet>
        <title>PLPB Group: Avail Easy EMIs</title>
        <meta
          name="description"
          content="Use PLPB’s EMI Calculator to estimate your monthly payments and plan your property investment better."
        />
        <meta
          name="keywords"
          content="plpb emi calculator, emi calculator for real estate"
        />
        <link rel="canonical" href="https://plpb.in/emi-calculator" />
      </Helmet>

      <div>
        <EMICalculator />
      </div>
    </>
  );
};

export default EMICalculatorPage;
