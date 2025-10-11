import { FaFacebook, FaYoutube } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { AiFillInstagram } from "react-icons/ai";
import { TbBrandLinkedinFilled } from "react-icons/tb";
import logo from "/assets/Images/PLPB.png";

export const Footer = () => {
  return (
    <footer className="bg-[#132c51] text-white pt-10 pb-4 border-t border-[#3b5998]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-0">
          {/* Logo and Socials */}
          <div className="flex flex-col items-start md:w-1/4">
            <img src={logo} alt="PLPB image" className="mb-8 w-36" />
            <div className="w-full flex justify-start gap-7 mb-10">
              <a href="#" aria-label="Facebook" className="border-2 border-white bg-transparent rounded-full w-10 h-10 flex items-center justify-center">
                <FaFacebook className="w-5 h-5 text-white" />
              </a>
              <a href="#" aria-label="Twitter" className="border-2 border-white bg-transparent rounded-full w-10 h-10 flex items-center justify-center">
                <RiTwitterXLine className="w-5 h-5 text-white" />
              </a>
              <a href="#" aria-label="Instagram" className="border-2 border-white bg-transparent rounded-full w-10 h-10 flex items-center justify-center">
                <AiFillInstagram className="w-5 h-5 text-white" />
              </a>
              <a href="#" aria-label="Youtube" className="border-2 border-white bg-transparent rounded-full w-10 h-10 flex items-center justify-center">
                <FaYoutube className="w-5 h-5 text-white" />
              </a>
              <a href="#" aria-label="Linkedin" className="border-2 border-white bg-transparent rounded-full w-10 h-10 flex items-center justify-center">
                <TbBrandLinkedinFilled className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Links & Projects */}
          <div className="flex justify-between px-6 lg:pl-12 sm:py-10 lg:py-0 gap-8">
            {/* Links */}
<div className="flex flex-col md:w-1/5">
  <h3 className="font-semibold mb-2 uppercase text-base">Links</h3>
  <ul className="space-y-2 text-sm capitalize">
    <li><a href="/AboutUs" className="hover:text-[#bfc9e0]">About</a></li>
    <li><a href="/contactus" className="hover:text-[#bfc9e0]">Contact</a></li>
    <li><a href="/NewsMedia" className="hover:text-[#bfc9e0]">Media</a></li>
    <li><a href="/blogs" className="hover:text-[#bfc9e0]">Blogs</a></li>
    <li><a href="/emi-calculator" className="hover:text-[#bfc9e0] whitespace-nowrap">EMI Calculator</a></li>
    <li><a href="/stamp-duty-calculator" className="hover:text-[#bfc9e0] whitespace-nowrap">Stamp Duty Calculator</a></li>
    <li><a href="#" className="hover:text-[#bfc9e0]"></a></li>
  </ul>
</div>

{/* Projects */}
<div className="flex flex-col md:w-1/5">
  <h3 className="font-semibold mb-2 uppercase text-base">Projects</h3>
  <ul className="space-y-2 text-sm capitalize">
    <li><a href="/wellnesscity" className="hover:text-[#bfc9e0] whitespace-nowrap">The wellness city</a></li>
    <li><a href="/Induspark" className="hover:text-[#bfc9e0]">Induspark</a></li>
  </ul>
</div>

          </div>

          {/* Contact Us */}
          <div className="flex flex-col md:w-1/3 ml-6 mt-6 lg:mt-0 lg:ml-12">
            <h3 className="font-semibold mb-2 uppercase text-base">Contact Us</h3>
            <div className="mb-2 text-sm capitalize">
              <span className="font-semibold">Sales Office: </span>
               2<sup>nd</sup> Floor, SCO 10,<br />
              Airport Road, Sector 80, Sahibzada Ajit Singh Nagar, Punjab.
            </div>
            <div className="mb-2 text-sm capitalize">
              <span className="font-semibold">Corporate Office: </span>
               SCO 131-132,<br />
              Shopping Plaza, 17C, Sector 17, Chandigarh
            </div>
            <div className="mb-2 text-sm lowercase">contact@plpbinfra.com</div>
            <div className="mb-2 text-sm lowercase">+91-92094-93094</div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-row justify-between items-center border-t border-[#bfc9e0]/30 mt-8 pt-2 text-xs text-[#bfc9e0] uppercase">
          <div>
            <a href="/privacy-policy" className="hover:text-white">Privacy Policy</a>
          </div>
          <div className="font-semibold">© 2025 PLPB GROUP</div>
        </div>
      </div>
    </footer>
  );
};
