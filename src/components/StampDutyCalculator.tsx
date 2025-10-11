import { Helmet } from "react-helmet-async";
import React, { useState, useRef, useEffect } from "react";

const faqs = [
  {
    question: "What is a Stamp Duty and Registration Charges Calculator?",
    answer:
      "It helps you estimate the costs you'll pay while registering your property with the local revenue department (Tehsil, District).",
  },
  {
    question: "What is the Stamp Duty?",
    answer:
      "A state government fee paid to legally register your property in your name in the state.",
  },
  {
    question: "How are stamp duty and registration charges calculated?",
    answer:
      "A stamp duty of 3–7% and 2% government fee* of the property's market value, as per the state, purpose, and ownership.",
  },
  {
    question: "Are these charges included in my home loan?",
    answer: "No, you need to pay them separately.",
  },
  { question: "Is stamp duty refundable?", answer: "No, once paid, it cannot be refunded." },
  { question: "Does stamp duty include GST?", answer: "No, GST and stamp duty are charged separately." },
  {
    question: "How can I pay stamp duty?",
    answer: "Through stamp paper, franking at a bank, or online e-stamping via SHCIL.",
  },
];

const states = [
  { label: "Punjab", value: "punjab" },
  { label: "Haryana", value: "haryana" },
  { label: "Himachal Pradesh", value: "himachal" },
];

const holderTypes = [
  { label: "Individual Male", value: "male" },
  { label: "Individual Female", value: "female" },
  { label: "Joint Holder", value: "joint" },
];

const stampDutyRates = {
  punjab: { male: 0.06, female: 0.04, joint: 0.05 },
  haryana: { male: 0.05, female: 0.04, joint: 0.03 },
  himachal: { male: 0.06, female: 0.04, joint: 0.05 },
};

const StampDutyCalculator: React.FC = () => {
  const [state, setState] = useState("punjab");
  const [propertyValue, setPropertyValue] = useState(10000000);
  const [holderType, setHolderType] = useState("male");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isEditingAmount, setIsEditingAmount] = useState(false);

  const sliderRef = useRef<HTMLInputElement>(null);
  const [sliderPercent, setSliderPercent] = useState(0);

  const minValue = 100000;
  const maxValue = 1000000000;

  const stampRate =
    stampDutyRates[state as keyof typeof stampDutyRates][
      holderType as "male" | "female" | "joint"
    ] || 0.06;

  const stampDuty = Math.round(propertyValue * stampRate);

  const formatCurrency = (amount: number) =>
    amount.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });

  useEffect(() => {
    const percent = ((propertyValue - minValue) / (maxValue - minValue)) * 100;
    setSliderPercent(percent);
  }, [propertyValue]);

  return (
    <>
      <Helmet>
        <title>PLPB Group: View Our Stamp Duty Tool</title>
        <meta
          name="description"
          content="Calculate your property stamp duty instantly with PLPB's easy-to-use online tool."
        />
        <meta
          name="keywords"
          content="stamp duty calculator for haryana state, stamp duty calculator for punjab, stamp duty calculator for himachal state"
        />
        <link rel="canonical" href="https://plpb.in/stamp-duty-calculator" />
        <style>
          {`
            .range-slider {
              -webkit-appearance: none;
              width: 100%;
              height: 6px;
              border-radius: 3px;
              outline: none;
              margin-top: 8px;
            }
            
            .range-slider::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: white;
              cursor: pointer;
              border: 2px solid #B59F5B;
              box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            }
            
            .range-slider::-moz-range-thumb {
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: white;
              cursor: pointer;
              border: 2px solid #B59F5B;
              box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            }
          `}
        </style>
      </Helmet>

      <div>
        {/* Banner */}
        <div style={{ width: "100%", height: "full", overflow: "hidden", position: "relative" }}>
          <img
            src="/assets/Images/sdr.jpg"
            alt="Stamp Duty Calculator Banner"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
          />
        </div>

        {/* Calculator */}
        <main className="max-w-7xl mx-auto w-full px-4 py-10 flex flex-col gap-10">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-[#9f944a] mb-2">
              Stamp Duty Calculator
            </h1>
            <p className="text-lg text-gray-600">Plan Your Property Costs Smartly</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Inputs */}
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-6">
              {/* State Dropdown */}
              <div className="p-4 rounded-lg bg-white">
                <label className="block font-bold text-black text-lg mb-3">1. Select your State</label>
                <div className="relative">
                  <select
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 pl-4 text-lg font-semibold bg-white focus:border-[#B59F5B] focus:outline-none transition-colors appearance-none"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    {states.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Property Amount */}
              <div className="p-4 rounded-lg bg-white">
                <label className="block font-bold text-black text-lg mb-6">2. Property Amount</label>
                
                {/* Slider with tooltip */}
                <div className="relative mb-4">
                  <input
                    ref={sliderRef}
                    type="range"
                    min={minValue}
                    max={maxValue}
                    step={100000}
                    value={propertyValue}
                    onChange={(e) => setPropertyValue(Number(e.target.value))}
                    className="w-full range-slider"
                    style={{
                      background: `linear-gradient(to right, #B59F5B 0%, #B59F5B ${sliderPercent}%, #F5F5F5 ${sliderPercent}%, #F5F5F5 100%)`,
                    }}
                  />
                  
                  {/* Tooltip above the slider thumb */}
                  <div
                    className="absolute top-0 transform -translate-x-1/2 -translate-y-full"
                    style={{ left: `${sliderPercent}%` }}
                  >
                    <div className="bg-[#B59F5B] text-white text-xs rounded px-1 py-1 text-center shadow-lg">
                      {propertyValue >= 10000000 ? `₹${(propertyValue / 10000000).toFixed(1)}Cr` : `₹${(propertyValue / 100000).toFixed(1)}L`}
                      <div className="absolute left-1/2 -bottom-1 w-2 h-2 bg-[#B59F5B] transform -translate-x-1/2 rotate-45"></div>
                    </div>
                  </div>
                </div>

                {/* Slider labels */}
                <div className="flex justify-between text-xs text-gray-400 mt-1 mb-4">
                  <span>₹1,00,000</span>
                  <span>₹10,00,00,000</span>
                </div>

                {/* Property Amount Input */}
                <div className="relative">
                  {!isEditingAmount ? (
                    <div className="flex items-center justify-between border-2 border-gray-200 rounded-lg px-4 py-3 bg-white hover:border-gray-300 transition-colors">
                      <span className="text-lg font-semibold text-gray-800">Property Amount</span>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-semibold text-gray-800">
                          ₹ {propertyValue.toLocaleString("en-IN")}
                        </span>
                        <img
                          src="/assets/Images/icon.png"
                          alt="Edit"
                          className="w-4 h-4 cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => setIsEditingAmount(true)}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between border-2 border-[#B59F5B] rounded-lg px-4 py-3 bg-white transition-colors">
                      <span className="text-lg font-semibold text-gray-800">Property Amount</span>
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          min={minValue}
                          max={1000000000}
                          step={100000}
                          value={propertyValue}
                          onChange={(e) => {
                            const value = Number(e.target.value);
                            if (value <= 1000000000 && value >= minValue) {
                              setPropertyValue(value);
                            }
                          }}
                          className="text-lg font-semibold text-gray-800 bg-transparent border-none outline-none text-right w-32"
                          autoFocus
                        />
                        <button
                          onClick={() => setIsEditingAmount(false)}
                          className="text-[#B59F5B] hover:text-[#9f944a] font-semibold text-sm transition-colors"
                        >
                          ✓
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Holder Type Dropdown */}
              <div className="p-4 rounded-lg bg-white">
                <div className="flex items-center gap-2 mb-3">
                  <label className="block font-bold text-black text-lg">3. Property Holder Type</label>
                                      <div className="w-7 h-7 bg-gray-300 rounded-full flex items-center justify-center cursor-help">
                      <img 
    src="/assets/Images/info 2.svg" 
    alt="Info" 
    className="w-7 h-7 cursor-pointer hover:opacity-80 filter grayscale"
    title="Convert between major currencies."
   />
 
                    </div>
                </div>
                <div className="relative">
                  <select
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 pl-4 text-lg font-semibold bg-white focus:border-[#B59F5B] focus:outline-none transition-colors appearance-none"
                    value={holderType}
                    onChange={(e) => setHolderType(e.target.value)}
                  >
                    {holderTypes.map((h) => (
                      <option key={h.value} value={h.value}>
                        {h.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-6">
                              <div className="font-semibold text-lg mb-2 flex items-center gap-2">
                  Results
                    <img 
    src="/assets/Images/info 2.svg" 
    alt="Info" 
    className="w-7 h-7 cursor-pointer hover:opacity-80 filter grayscale"
    title="Convert between major currencies."
   />
 
                </div>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center border-b pb-2 bg-[#FBF9F2] p-4 rounded-lg">
                  <span className="text-gray-600">Stamp Rate</span>
                  <span className="text-lg font-semibold text-gray-800">
                    {(stampRate * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="flex justify-between items-center bg-[#FBF9F2] p-4 rounded-lg">
                  <span className="text-gray-600">Stamp Duty for your Property</span>
                  <span className="text-lg font-semibold text-gray-800">
                    {formatCurrency(stampDuty)}
                  </span>
                </div>
              </div>
            </div>
          </div>

         {/* FAQ */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-[#B59F5B] text-center mb-6">
              Frequently Asked Questions
            </h2>
            <div className="w-full mx-auto flex flex-col gap-4 px-4 md:px-0 max-w-6xl">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-md">
                  <button
                    className="w-full flex justify-between items-center px-6 py-4 text-left font-medium text-gray-700 focus:outline-none hover:bg-gray-50 transition-colors"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  >
                    <span className="text-base">{faq.question}</span>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#B59F5B] shadow-md">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {openFaq === idx ? (
                          // Downward chevron for expanded state (▼)
                          <polyline points="6 9 12 15 18 9" />
                        ) : (
                          // Right-pointing chevron for collapsed state (▶️)
                          <polyline points="9 6 15 12 9 18" />
                        )}
                      </svg>
                    </div>
                  </button>
                  {openFaq === idx && (
                    <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </>
  );
};

export default StampDutyCalculator;