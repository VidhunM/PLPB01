import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Logo from "/assets/Images/PLPB.png";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { IoMdArrowDropdown } from "react-icons/io";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { GetInTouchButton } from "./GetInTouchButton"; // Import the new vertical button component

export const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState("");
  const [activeMedia, setActiveMedia] = useState("");
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isMediaOpen, setIsMediaOpen] = useState(false);
  // Removed: const [isContactSheetOpen, setIsContactSheetOpen] = useState(false);

  const navlinks = [
    { label: "Home", path: "/" },
    { label: "ABOUT GROUP", path: "/aboutus" },
    { label: "PROJECTS", path: "#" },
    { label: "NEWS & MEDIA", path: "/newsMedia" },
    { label: "CONTACT US", path: "/contactus" },
    { label: "APPOINTMENT", path: "/appointment" },
  ];

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50 bg-transparent animate-fade-in">
        <div className="container mx-auto px-4 pt-4 pb-6"> {/* Adjusted spacing */}
          <div className="flex items-center justify-between gap-8">
            <img
              src={Logo}
              alt="PLPB image"
              className="cursor-pointer h-8 md:h-10 lg:h-12"
              onClick={() => navigate("/")}
            />

            <NavigationMenu className="animate-fade-in-right w-full hidden lg:block">
              <NavigationMenuList className="flex justify-center items-center gap-12 w-full">
                <NavigationMenuItem>
                  <Button
                    variant="ghost"
                    className="text-white hover:text-white hover:bg-transparent transition-all duration-300 px-6 py-2 text-base font-normal bg-transparent focus:bg-transparent active:bg-transparent border-none outline-none shadow-none"
                    onClick={() => navigate("/")}
                  >
                    HOME
                  </Button>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Button
                    variant="ghost"
                    className="text-white hover:text-white hover:bg-transparent transition-all duration-300 px-6 py-2 text-base font-normal tracking-wide bg-transparent focus:bg-transparent active:bg-transparent border-none outline-none shadow-none"
                    onClick={() => navigate("/aboutus")}
                  >
                    ABOUT GROUP
                  </Button>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <DropdownMenu open={isProjectsOpen} onOpenChange={setIsProjectsOpen}>
                    <DropdownMenuTrigger className="text-white flex items-center gap-2 focus:outline-none focus:ring-0 focus:border-none text-base font-normal">
                      PROJECTS <IoMdArrowDropdown />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="bg-[#232323] rounded-lg shadow-lg p-0 min-w-[220px] border-none"
                      onMouseLeave={() => setIsProjectsOpen(false)}
                    >
                      <button
                        onClick={() => {
                          navigate("/wellnesscity");
                          setIsProjectsOpen(false);
                        }}
                        className="block w-full pl-6 pr-4 py-3 text-left font-normal text-lg md:text-xl rounded-lg focus:outline-none text-white transition-colors duration-200 hover:text-[#d6b24c] hover:bg-[#232323]"
                        style={{
                          boxShadow: "0 4px 24px 0 rgba(0,0,0,0.18)",
                        }}
                      >
                        The Wellness City
                      </button>
                      <button
                        onClick={() => {
                          navigate("/induspark");
                          setIsProjectsOpen(false);
                        }}
                        className="block w-full pl-6 pr-4 py-3 text-left font-normal text-lg md:text-xl rounded-lg focus:outline-none text-white transition-colors duration-200 hover:text-[#d6b24c] hover:bg-[#232323]"
                        style={{
                          boxShadow: "0 4px 24px 0 rgba(0,0,0,0.18)",
                        }}
                      >
                        IndusPark
                      </button>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <DropdownMenu open={isMediaOpen} onOpenChange={setIsMediaOpen}>
                    <DropdownMenuTrigger className="text-white flex items-center gap-2 focus:outline-none focus:ring-0 focus:border-none text-base font-normal">
                      NEWS & MEDIA <IoMdArrowDropdown />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="bg-[#232323] rounded-lg shadow-lg p-0 min-w-[200px] border-none"
                      onMouseLeave={() => setIsMediaOpen(false)}
                    >
                      <button
                        onClick={() => {
                          navigate("/newsMedia");
                          setIsMediaOpen(false);
                        }}
                        className="block w-full px-8 py-3 text-left font-normal text-lg md:text-xl rounded-lg focus:outline-none text-white transition-colors duration-200 hover:text-[#d6b24c] hover:bg-[#232323]"
                        style={{
                          boxShadow: "0 4px 24px 0 rgba(0,0,0,0.18)",
                        }}
                      >
                        Press Release
                      </button>
                      <button
                        onClick={() => {
                          navigate("/videos");
                          setIsMediaOpen(false);
                        }}
                        className="block w-full px-8 py-3 text-left font-normal text-lg md:text-xl rounded-lg focus:outline-none text-white transition-colors duration-200 hover:text-[#d6b24c] hover:bg-[#232323]"
                        style={{
                          boxShadow: "0 4px 24px 0 rgba(0,0,0,0.18)",
                        }}
                      >
                        Videos
                      </button>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </NavigationMenuItem>



                <NavigationMenuItem>
                  <Button
                    variant="ghost"
                    className="text-white hover:text-white hover:bg-transparent transition-all duration-300 px-6 py-2 text-base font-normal tracking-wide bg-transparent focus:bg-transparent active:bg-transparent border-none outline-none shadow-none"
                    onClick={() => navigate("/appointment")}
                  >
                    APPOINTMENT
                  </Button>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Button
                    variant="ghost"
                    className="text-white hover:text-white hover:bg-transparent transition-all duration-300 px-6 py-2 text-base font-normal tracking-wide bg-transparent focus:bg-transparent active:bg-transparent border-none outline-none shadow-none"
                    onClick={() => navigate("/contactus")}
                  >
                    CONTACT US
                  </Button>
                </NavigationMenuItem>

              </NavigationMenuList>
            </NavigationMenu>

            <div className="text-white pr-4 lg:hidden cursor-pointer">
              <div onClick={() => setisMenuOpen(true)}>
                <Menu />
              </div>
            </div>
          </div>
        </div>
        <GetInTouchButton /> {/* Add the new vertical button component here */}
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm w-full h-screen top-0 z-[999] overflow-hidden lg:hidden">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between gap-8">
              <img
                src={Logo}
                alt="PLPB image"
                className="h-10"
                onClick={() => navigate("/")}
              />
              <div className="text-white pr-4 lg:hidden cursor-pointer">
                <div onClick={() => setisMenuOpen(false)}>
                  <X />
                </div>
              </div>
            </div>
            <div className="mt-8">
              <ul className="flex flex-col gap-3 text-white text-xl font-medium tracking-wide">
  <li>
    <Link to="/" onClick={() => setisMenuOpen(false)} className="block px-2 py-2 hover:text-[#d6b24c]">HOME</Link>
  </li>
  <li>
    <Link to="/aboutus" onClick={() => setisMenuOpen(false)} className="block px-2 py-2 hover:text-[#d6b24c]">ABOUT GROUP</Link>
  </li>

  {/* PROJECTS DROPDOWN */}
  <li className="group">
    <div className="px-2 py-2 cursor-pointer hover:text-[#d6b24c]">
      PROJECTS
    </div>
    <ul className="ml-4 mt-1 flex flex-col gap-2">
      <li>
        <Link
          to="/wellnesscity"
          onClick={() => setisMenuOpen(false)}
          className="block text-base px-2 py-1 hover:text-[#d6b24c]"
        >
          The Wellness City
        </Link>
      </li>
      <li>
        <Link
          to="/induspark"
          onClick={() => setisMenuOpen(false)}
          className="block text-base px-2 py-1 hover:text-[#d6b24c]"
        >
          IndusPark
        </Link>
      </li>
    </ul>
  </li>

  {/* NEWS & MEDIA DROPDOWN */}
  <li className="group">
    <div className="px-2 py-2 cursor-pointer hover:text-[#d6b24c]">
      NEWS & MEDIA
    </div>
    <ul className="ml-4 mt-1 flex flex-col gap-2">
      <li>
        <Link
          to="/newsMedia"
          onClick={() => setisMenuOpen(false)}
          className="block text-base px-2 py-1 hover:text-[#d6b24c]"
        >
          Press Release
        </Link>
      </li>
      <li>
        <Link
          to="/videos"
          onClick={() => setisMenuOpen(false)}
          className="block text-base px-2 py-1 hover:text-[#d6b24c]"
        >
          Videos
        </Link>
      </li>
    </ul>
  </li>



  <li>
    <Link to="/appointments" onClick={() => setisMenuOpen(false)} className="block px-2 py-2 hover:text-[#d6b24c]">
      APPOINTMENT
    </Link>
  </li>
  <li>
    <Link to="/contactus" onClick={() => setisMenuOpen(false)} className="block px-2 py-2 hover:text-[#d6b24c]">
      CONTACT US
    </Link>
  </li>
</ul>

            </div>
          </div>
        </div>
      )}
    </>
  );
};