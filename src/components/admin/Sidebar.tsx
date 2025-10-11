import { Link, useLocation } from "react-router-dom";

interface SidebarLinkType {
  name: string;
  link: string;
}

const SidebarLink = [
  // { name: 'Home', link: '/admin' },
  { name: "Blog", link: "/admin/blog" },
];

const Sidebar = () => {
  const location = useLocation();
  return (
    <div className="h-full">
      <div className="flex h-full flex-col gap-2 p-4">
        {SidebarLink.map((item: SidebarLinkType, index: number) => (
          <Link
            to={item.link}
            key={index}
            className={`group relative overflow-hidden rounded-lg px-6 py-3 font-medium transition-all duration-300 ${
              location.pathname === item.link
                ? "text-white"
                : "text-black hover:text-white"
            }`}
          >
            <div
              className={`to-blue-950 absolute inset-0 bg-gradient-to-r from-blue-600 transition-transform duration-300 ${
                location.pathname === item.link
                  ? "translate-x-0"
                  : "-translate-x-full group-hover:translate-x-0"
              }`}
            ></div>
            <span className="relative z-10">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
