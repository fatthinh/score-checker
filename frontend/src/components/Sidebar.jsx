import { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { NAV_ITEMS } from "~/utils/contants";

function Sidebar() {
  const [active, setActive] = useState(0);
  const location = useLocation();

  useEffect(() => {
    setActive(NAV_ITEMS.findIndex((item) => item.path === location.pathname));
  }, [location.pathname]);

  return (
    <aside
      id="main-sidebar"
      className="hidden md:block z-50 absolute overflow-hidden top-5 left-5 bottom-8 w-64 md:w-16 rounded-xl bg-gradient-to-br from-primary-800 to-primary-500 will-change-auto transition-discrete md:duration-500 hover:w-64"
    >
      <div className="absolute top-0 left-0 bottom-0 w-64">
        <div className="flex items-center h-20 py-5 text-primary-100 px-3">
          <h1 className="font-medium text-sm tracking-wide">Menu</h1>
        </div>
        <nav className="relative">
          <div
            className={`absolute w-1 h-14 left-0 bg-primary-200 transition-all duration-500`}
            style={{
              top: active * 56,
            }}
          ></div>
          {NAV_ITEMS.map((item, index) => (
            <Link
              className={`flex gap-6 items-center h-14 w-full px-5 ${
                active === index ? "text-primary-500" : "text-primary-100"
              } transition-colors duration-500 hover:text-primary-500 font-bold hover:cursor-pointer`}
              key={index}
              to={item.path}
            >
              <span>
                <item.icon className="!w-5 !h-5" />
              </span>
              <p>{item.name}</p>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
