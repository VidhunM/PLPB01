// components/ContactUsForm.tsx
import React, { useState } from "react";
import { FiRefreshCw } from "react-icons/fi";

const ContactUsForm = () => {
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [inputCaptcha, setInputCaptcha] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    interestedIn: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ Prevent double click

  function generateCaptcha() {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz";
    let newCaptcha = "";
    for (let i = 0; i < 4; i++) {
      newCaptcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return newCaptcha;
  }

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setInputCaptcha("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const getLeadSource = () => {
    const referrer = document.referrer;
    if (referrer.includes("google")) return "google";
    if (referrer.includes("bing")) return "bing";
    if (referrer.includes("facebook")) return "facebook";
    if (referrer.includes("instagram")) return "instagram";
    return "direct";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return; // ✅ Block multiple clicks
    setIsSubmitting(true);

    if (inputCaptcha.toLowerCase() !== captcha.toLowerCase()) {
      alert("❌ Captcha is incorrect.");
      setIsSubmitting(false);
      return;
    }

    try {
      const ipRes = await fetch("https://api.ipify.org?format=json");
      const ipData = await ipRes.json();

      const payload = {
        ...formData,
        ip: ipData.ip || "Unavailable",
        source: getLeadSource(),
      };

      const res = await fetch("https://email-send-l0vm.onrender.com/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (result.success) {
        alert("✅ Message sent successfully!");
        window.location.reload(); // ✅ Reload after success
      } else {
        alert("❌ Failed to send message.");
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error("Error sending mail:", err);
      alert("⚠️ Error occurred while sending the message.");
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full px-4 py-3 bg-[#f5f5f5] rounded-md text-sm focus:outline-none"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full px-4 py-3 bg-[#f5f5f5] rounded-md text-sm focus:outline-none"
        required
      />
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone Number"
        className="w-full px-4 py-3 bg-[#f5f5f5] rounded-md text-sm focus:outline-none"
      />
      <input
        type="text"
        name="city"
        value={formData.city}
        onChange={handleChange}
        placeholder="City"
        className="w-full px-4 py-3 bg-[#f5f5f5] rounded-md text-sm focus:outline-none"
      />

      <select
        name="interestedIn"
        value={formData.interestedIn}
        onChange={handleChange}
        className="w-full px-4 py-3 bg-[#f5f5f5] rounded-md text-sm focus:outline-none text-gray-500"
      >
        <option value="">Interested In</option>
        <option value="Residential Plots">RESIDENTIAL PLOTS</option>
        <option value="Commercial Plaza">COMMERCIAL PLAZA</option>
      </select>

      {/* Captcha */}
      <div className="text-sm text-gray-700 mt-4">Solve the captcha below:</div>
      <div className="flex items-center gap-2">
        <div className="bg-white border border-gray-300 rounded-md px-4 py-2 text-lg font-mono">
          {captcha}
        </div>
        <button onClick={refreshCaptcha} type="button">
          <FiRefreshCw className="text-xl text-gray-500" />
        </button>
      </div>

      <input
        type="text"
        placeholder="Enter Captcha"
        value={inputCaptcha}
        onChange={(e) => setInputCaptcha(e.target.value)}
        className="w-full px-4 py-3 mt-2 bg-[#f5f5f5] rounded-md text-sm focus:outline-none"
        required
      />

      <button
        type="submit"
        disabled={isSubmitting} // ✅ Disable after first click
        className={`w-full ${
          isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-[#d6b24c]"
        } text-white font-semibold py-3 rounded-full text-sm tracking-wide uppercase mt-4`}
      >
        {isSubmitting ? "SENDING..." : "REQUEST A CALL BACK"}
      </button>
    </form>
  );
};

export default ContactUsForm;
