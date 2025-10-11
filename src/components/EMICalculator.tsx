import React, { useState, useEffect } from "react";
import { Header } from "./Header";

const faqs = [
  {
    question: "What is an EMI Calculator?",
    answer: "An EMI Calculator helps you estimate your monthly loan payments instantly.",
  },
  {
    question: "Are EMI calculators free to use?",
    answer: "Yes, they are completely free for everyone.",
  },
  {
    question: "Do I need to sign up to use them?",
    answer: "No sign-up or personal details are required.",
  },
  {
    question: "Can I plan for different amounts?",
    answer: "Yes, you can try any loan amount, interest rate, or tenure.",
  },
  {
    question: "How accurate are the results?",
    answer: "They give close estimates based on standard formulas as of the date of the bank interest rates.",
  },
  {
    question: "Can I use these calculators on mobile?",
    answer: "Yes, they work smoothly on all mobile devices.",
  },
  {
    question: "Do the calculators save my data?",
    answer: "No, they don't store or track any personal information.",
  },
];

// Your API key from currencyapi.com
const CURRENCY_API_KEY = 'cur_live_u225fjO1PzikLUTatgayfCU7LVA2SyVgPIRFXGe9'; 
const CURRENCY_API_BASE_URL = 'https://api.currencyapi.com/v3/latest';

const currencySymbols = {
  USD: "$",
  INR: "₹",
  EUR: "€",
  GBP: "£",
};

const currencyNames = {
  USD: "American Dollar (USD)",
  INR: "Indian Rupees (INR)",
  EUR: "Euro (EUR)",
  GBP: "British Pound (GBP)",
};

const EMICalculator = () => {
  // EMI Calculator States
  const [loan, setLoan] = useState(10000000);
  const [rate, setRate] = useState(6);
  const [years, setYears] = useState(5);

  // Currency Converter States
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [fromAmount, setFromAmount] = useState(1);
  const [toAmount, setToAmount] = useState(0);
  const [exchangeRates, setExchangeRates] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState(null);

  // FAQ State
  const [openFaq, setOpenFaq] = useState(0);

  // Fetch exchange rates from CurrencyAPI
  const fetchExchangeRates = async (baseCurrency = 'USD') => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `${CURRENCY_API_BASE_URL}?apikey=${CURRENCY_API_KEY}&base_currency=${baseCurrency}&currencies=USD,EUR,GBP,INR`
      );
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.data) {
        const rates = {};
        Object.keys(data.data).forEach(currency => {
          rates[currency] = data.data[currency].value;
        });
        
        setExchangeRates(rates);
        setLastUpdated(new Date().toLocaleTimeString());
        
        // Convert initial amount
        if (rates[toCurrency]) {
          const converted = fromAmount * (rates[toCurrency] / rates[fromCurrency]);
          setToAmount(Math.round(converted * 100) / 100);
        }
      }
    } catch (err) {
      setError(`Failed to fetch rates: ${err.message}`);
      console.error('Currency API Error:', err);
      
      // Fallback to static rates if API fails
      const fallbackRates = {
        USD: 1,
        EUR: 0.85,
        GBP: 0.73,
        INR: 83.25
      };
      setExchangeRates(fallbackRates);
      const converted = fromAmount * (fallbackRates[toCurrency] / fallbackRates[fromCurrency]);
      setToAmount(Math.round(converted * 100) / 100);
    } finally {
      setIsLoading(false);
    }
  };

  // Load exchange rates on component mount
  useEffect(() => {
    fetchExchangeRates();
  }, []);

  // Refresh rates when base currency changes
  useEffect(() => {
    if (Object.keys(exchangeRates).length > 0) {
      fetchExchangeRates(fromCurrency);
    }
  }, [fromCurrency]);

  // EMI Calculation
  const n = years * 12;
  const r = rate / 12 / 100;
  const emi = loan && rate && years ? Math.round((loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)) : 0;
  const totalAmount = emi * n;
  const totalInterest = totalAmount - loan;

  // Calculate percentage for gradient fills
  const loanPercentage = ((loan - 100000) / (10000000 - 100000)) * 100;
  const ratePercentage = ((rate - 1) / (20 - 1)) * 100;
  const yearsPercentage = ((years - 1) / (30 - 1)) * 100;
  
  // Calculate EMI percentage for result slider
  // Calculate max possible EMI (at max loan, max rate, min tenure)
  const maxEMI = Math.round((10000000 * (20 / 12 / 100) * Math.pow(1 + (20 / 12 / 100), 1 * 12)) / (Math.pow(1 + (20 / 12 / 100), 1 * 12) - 1));
  const emiPercentage = emi > 0 ? ((emi - 0) / (maxEMI - 0)) * 100 : 0;
  
  // Calculate max possible interest (at max loan, max rate, min tenure)
  const maxTotalAmount = maxEMI * 12; // 1 year tenure
  const maxInterest = maxTotalAmount - 10000000;
  const interestPercentage = totalInterest > 0 ? ((totalInterest - 0) / (maxInterest - 0)) * 100 : 0;
  
  // Calculate inverse interest percentage for contrasting relationship
  const inverseInterestPercentage = 100 - interestPercentage;
  
  // Calculate inverse percentages for rate and tenure for contrasting relationship
  const inverseRatePercentage = 100 - ratePercentage;
  const inverseYearsPercentage = 100 - yearsPercentage;
  
  // Calculate combined percentages for existing progress bars to respond to all 3 sliders
  // Principle amount bar responds to all 3 inputs (loan amount, interest rate, tenure)
  const combinedPrinciplePercentage = (loanPercentage * 0.4) + (ratePercentage * 0.3) + (yearsPercentage * 0.3);
  
  // Interest amount bar responds to all 3 inputs with inverse relationship
  const combinedInterestPercentage = (inverseInterestPercentage * 0.4) + (inverseRatePercentage * 0.3) + (inverseYearsPercentage * 0.3);

  // Currency Converter Logic with API rates
  const handleFromAmountChange = (val) => {
    setFromAmount(val);
    if (exchangeRates[fromCurrency] && exchangeRates[toCurrency]) {
      const converted = val * (exchangeRates[toCurrency] / exchangeRates[fromCurrency]);
      setToAmount(Math.round(converted * 100) / 100);
    }
  };

  const handleToAmountChange = (val) => {
    setToAmount(val);
    if (exchangeRates[fromCurrency] && exchangeRates[toCurrency]) {
      const converted = val * (exchangeRates[fromCurrency] / exchangeRates[toCurrency]);
      setFromAmount(Math.round(converted * 100) / 100);
    }
  };

  const handleFromCurrencyChange = (cur) => {
    setFromCurrency(cur);
    if (exchangeRates[cur] && exchangeRates[toCurrency]) {
      const converted = fromAmount * (exchangeRates[toCurrency] / exchangeRates[cur]);
      setToAmount(Math.round(converted * 100) / 100);
    }
  };

  const handleToCurrencyChange = (cur) => {
    setToCurrency(cur);
    if (exchangeRates[fromCurrency] && exchangeRates[cur]) {
      const converted = fromAmount * (exchangeRates[cur] / exchangeRates[fromCurrency]);
      setToAmount(Math.round(converted * 100) / 100);
    }
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleClear = () => {
    setFromAmount(0);
    setToAmount(0);
  };

  const handleRefreshRates = () => {
    fetchExchangeRates(fromCurrency);
  };

  return (
     <div>
      {/* Banner with Header overlay */}
      <div style={{ width: "100%", height: "full", overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", zIndex: 10 }}>
          <Header />
        </div>
        <img
          src="/assets/Images/emi.jpg"
          alt="Appointments Banner"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
        />
      </div>
        
      
      {/* EMI Calculator Section */}
      <main className="max-w-7xl mx-auto w-full px-4 py-10 flex flex-col gap-10">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#9f944a] mb-2">EMI Calculator</h1>
          <p className="text-lg text-gray-600">Plan Your Home With Confidence</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-6">
            {/* Loan Amount */}
            <div>
              <label className="block font-semibold mb-6">1. Enter your loan amount</label>
              <div className="relative">
                <input
                  type="range"
                  min={100000}
                  max={10000000}
                  step={10000}
                  value={loan}
                  onChange={(e) => setLoan(Number(e.target.value))}
                  className="w-full range-slider loan-slider"
                  style={{
                    background: `linear-gradient(to right, #B59F5B 0%, #B59F5B ${loanPercentage}%, #F5F5F5 ${loanPercentage}%, #F5F5F5 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>₹1,00,000</span>
                  <span>₹1,00,00,000</span>
                </div>
                {/* Loan Amount Tooltip */}
                <div
                  className="absolute top-0 transform -translate-x-1/2 -translate-y-full"
                  style={{ left: `${loanPercentage}%` }}
                >
                  <div className="bg-[#B59F5B] text-white text-xs rounded px-1 py-1 text-center shadow-lg">
                    ₹{(loan / 100000).toFixed(1)}L
                    <div className="absolute left-1/2 -bottom-1 w-2 h-2 bg-[#B59F5B] transform -translate-x-1/2 rotate-45"></div>
                  </div>
                </div>
              </div>
              <div className="relative mt-2">
                <input
                  type="number"
                  min={100000}
                  max={10000000}
                  step={10000}
                  value={loan}
                  onChange={(e) => setLoan(Number(e.target.value))}
                  className="w-full border rounded px-3 py-2 text-lg font-semibold text-right bg-[#FBF9F2]"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500 font-semibold">Loan Amount</span>
                </div>
              </div>
            </div>

            {/* Rate of Interest */}
            <div>
              <label className="block font-semibold mb-6">2. Enter Rate of Interest (p.a)</label>
              <div className="relative">
                <input
                  type="range"
                  min={1}
                  max={20}
                  step={0.1}
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full range-slider rate-slider"
                  style={{
                    background: `linear-gradient(to right, #B59F5B 0%, #B59F5B ${ratePercentage}%, #F5F5F5 ${ratePercentage}%, #F5F5F5 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>1%</span>
                  <span>20%</span>
                </div>
                {/* Interest Rate Tooltip */}
                <div
                  className="absolute top-0 transform -translate-x-1/2 -translate-y-full"
                  style={{ left: `${ratePercentage}%` }}
                >
                  <div className="bg-[#B59F5B] text-white text-xs rounded px-1 py-1 text-center shadow-lg">
                    {rate.toFixed(1)}%
                    <div className="absolute left-1/2 -bottom-1 w-2 h-2 bg-[#B59F5B] transform -translate-x-1/2 rotate-45"></div>
                  </div>
                </div>

              </div>
              <div className="relative mt-2">
                <input
                  type="number"
                  min={1}
                  max={20}
                  step={0.1}
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full border rounded px-3 py-2 text-lg font-semibold text-right bg-[#FBF9F2]"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500 font-semibold">Rate of Interest (p.a)</span>
                </div>
              </div>
            </div>

            {/* Loan Tenure */}
            <div>
              <label className="block font-semibold mb-6">3. Enter your Loan tenure (in terms of years)</label>
              <div className="relative">
                <input
                  type="range"
                  min={1}
                  max={30}
                  step={1}
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full range-slider tenure-slider"
                  style={{
                    background: `linear-gradient(to right, #B59F5B 0%, #B59F5B ${yearsPercentage}%, #F5F5F5 ${yearsPercentage}%, #F5F5F5 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>1</span>
                  <span>30</span>
                </div>
                {/* Tenure Tooltip */}
                <div
                  className="absolute top-0 transform -translate-x-1/2 -translate-y-full"
                  style={{ left: `${yearsPercentage}%` }}
                >
                  <div className="bg-[#B59F5B] text-white text-xs rounded px-1 py-1 text-center shadow-lg">
                    {years}
                    <div className="absolute left-1/2 -bottom-1 w-2 h-2 bg-[#B59F5B] transform -translate-x-1/2 rotate-45"></div>
                  </div>
                </div>

              </div>
              <div className="relative mt-2">
                <input
                  type="number"
                  min={1}
                  max={30}
                  step={1}
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full border rounded px-3 py-2 text-lg font-semibold text-right bg-[#FBF9F2]"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500 font-semibold">Terms</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Results */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-6">
            <div className="font-bold text-xl text-black mb-2">Results</div>
            <div className="text-gray-600 text-sm mb-6">
              With an interest rate of <span className="font-bold text-black">{rate.toFixed(2)}%</span> over <span className="font-bold text-black">{years} Years</span>, you will pay <span className="font-bold text-black">₹{emi.toLocaleString()}</span> per month and <span className="font-bold text-black">₹{totalInterest.toLocaleString()}</span> in interest over the lifetime of your loan.
            </div>
            
            {/* Circular Visualization and Progress Bars */}
            <div className="flex items-start gap-6 mb-6">
              {/* Left Side - Circular Visualization */}
              <div className="relative w-24 h-24">
                <svg width="96" height="96" viewBox="0 0 96 96" className="transform -rotate-90">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="white"
                    stroke="#E5E7EB"
                    strokeWidth="8"
                  />
                  {/* Progress arc */}
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="#B59F5B"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 40 * 0.67} ${2 * Math.PI * 40}`}
                    strokeDashoffset="0"
                  />
                </svg>
                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="flex items-center gap-1">
                    <span className="text-[8px] font-bold text-black">₹{loan.toLocaleString()}</span>
                    <svg width="6" height="6" viewBox="0 0 24 24" fill="none" className="text-green-600">
                      <path d="M7 14l5-5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-[5px] text-black">Less in interest</span>
                </div>
              </div>
              
              {/* Right Side - Legends and Progress Bars */}
              <div className="flex-1">
                {/* Legends */}
                <div className="flex gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#B59F5B] rounded-full"></div>
                    <span className="text-xs text-gray-700">Principle Amount</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#B8B28C] rounded-full"></div>
                    <span className="text-xs text-gray-700">Interest Amount</span>
                  </div>
                </div>
                
                {/* Progress Bars */}
                <div className="space-y-2">
                  <div className="flex items-center gap-6">
                    <span className="text-xs font-medium text-black w-16">₹{loan.toLocaleString()}</span>
                    <div className="flex-1 h-3 rounded-full overflow-hidden flex">
                      <div
                        style={{
                          width: `${combinedPrinciplePercentage}%`,
                          backgroundColor: "#B59F5B"
                        }}
                      />
                      <div
                        style={{
                          width: `${100 - combinedPrinciplePercentage}%`,
                          backgroundColor: "#FBF9F2"
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-xs font-medium text-black w-16">₹{totalInterest.toLocaleString()}</span>
                    <div className="flex-1 h-3 rounded-full overflow-hidden flex">
                      <div
                        style={{
                          width: `${combinedInterestPercentage}%`,
                          backgroundColor: "#B8B28C"
                        }}
                      />
                      <div
                        style={{
                          width: `${100 - combinedInterestPercentage}%`,
                          backgroundColor: "#FBF9F2"
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Detailed Breakdown List */}
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg bg-[#FBF9F2]">
                <span className="font-bold text-black">Monthly EMI</span>
                <span className="font-bold text-black">₹ {emi.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg bg-white">
                <span className="text-black">Principle Amount</span>
                <span className="text-black">₹ {loan.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg bg-white">
                <span className="text-black">Total Interest</span>
                <span className="text-black">₹ {totalInterest.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg bg-white">
                <span className="text-black">Total Amount</span>
                <span className="text-black">₹ {totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Currency Converter */}
                <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-6">
          <div className="font-semibold text-lg mb-2 flex items-center gap-1">
  Currency Converter
 <img 
    src="/assets/Images/info 2.svg" 
    alt="Info" 
    className="w-7 h-7 cursor-pointer hover:opacity-80 filter grayscale"
    title="Convert between major currencies."
   />
   </div>
            
            {/* Rate info and refresh */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div>
                {lastUpdated && `Last updated: ${lastUpdated}`}
                {error && <span className="text-red-500">{error}</span>}
              </div>
              <button
                onClick={handleRefreshRates}
                disabled={isLoading}
                className="px-2 py-1 text-[#B59F5B] hover:bg-[#B59F5B] hover:text-white rounded text-xs transition-colors disabled:opacity-50"
                title="Refresh exchange rates"
              >
                🔄 Refresh
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {/* From currency - stacked select + input with symbol */}
              <div className="space-y-2">
                <div className="relative">
                  <select
                    className="border rounded px-3 py-2 w-full bg-[#FBF9F2] appearance-none pl-10"
                    value={fromCurrency}
                    onChange={(e) => handleFromCurrencyChange(e.target.value)}
                  >
                    {Object.keys(currencyNames).map((cur) => (
                      <option key={cur} value={cur}>
                        {currencyNames[cur]}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black/80 select-none">
                    {currencySymbols[fromCurrency]}
                  </span>
                  <input
                    type="number"
                    className="border rounded px-3 py-2 w-full pl-8 text-left bg-[#FBF9F2] disabled:opacity-50"
                    value={fromAmount}
                    onChange={(e) => handleFromAmountChange(Number(e.target.value))}
                    disabled={isLoading || Object.keys(exchangeRates).length === 0}
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  className="inline-flex items-center justify-center gap-1 p-1 text-black"
                  onClick={handleSwap}
                  title="Swap currencies"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20V5" />
                    <path d="M8 9l4-4 4 4" />
                  </svg>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 4v15" />
                    <path d="M8 15l4 4 4-4" />
                  </svg>
                </button>
              </div>
              {/* To currency - stacked select + input with symbol */}
              <div className="space-y-2">
                <div className="relative">
                  <select
                    className="border rounded px-3 py-2 w-full bg-[#FBF9F2] appearance-none pl-10"
                    value={toCurrency}
                    onChange={(e) => handleToCurrencyChange(e.target.value)}
                  >
                    {Object.keys(currencyNames).map((cur) => (
                      <option key={cur} value={cur}>
                        {currencyNames[cur]}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black/80 select-none">
                    {currencySymbols[toCurrency]}
                  </span>
                  <input
                    type="number"
                    className="border rounded px-3 py-2 w-full pl-8 text-left bg-[#FBF9F2] disabled:opacity-50"
                    value={toAmount}
                    onChange={(e) => handleToAmountChange(Number(e.target.value))}
                    disabled={isLoading || Object.keys(exchangeRates).length === 0}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  className="flex-1 bg-[#B59F5B] text-white px-4 py-2 rounded-lg text-base font-semibold hover:bg-[#a08a4a] disabled:opacity-50 transition-colors"
                  onClick={handleClear}
                  disabled={isLoading}
                >
                  Clear
                </button>
                <button
                  className="px-4 py-2 border border-[#B59F5B] text-[#B59F5B] rounded-lg text-base font-semibold hover:bg-[#B59F5B] hover:text-white disabled:opacity-50 transition-colors"
                  onClick={handleRefreshRates}
                  disabled={isLoading}
                  title="Get latest exchange rates"
                >
                  {isLoading ? '⏳' : '🔄'}
                </button>
              </div>
            </div>

            {/* Exchange rate display */}
            {exchangeRates[fromCurrency] && exchangeRates[toCurrency] && (
              <div className="text-xs text-gray-600 text-center p-2 bg-gray-50 rounded">
                1 {fromCurrency} = {(exchangeRates[toCurrency] / exchangeRates[fromCurrency]).toFixed(4)} {toCurrency}
              </div>
            )}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-[#9f944a] text-center mb-6">Frequently Asked Questions</h2>
          <div className="w-full flex flex-col gap-4 px-4 md:px-0">

            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded shadow">
                <button
                  className="w-full flex justify-between items-center px-4 py-3 text-left font-medium text-gray-700 focus:outline-none"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  aria-expanded={openFaq === idx}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span>{faq.question}</span>
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#B59F5B] shadow-md">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
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
                  <div id={`faq-answer-${idx}`} className="px-4 pb-4 text-gray-600 text-sm">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Range Slider Styles */}
      <style>
        {`
          /* Base slider styles */
          .range-slider {
            -webkit-appearance: none;
            width: 100%;
            height: 6px;
            border-radius: 3px;
            outline: none;
            margin-top: 8px;
          }
          
          /* Thumb styles */
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
    </div>
  );
};

export default EMICalculator;