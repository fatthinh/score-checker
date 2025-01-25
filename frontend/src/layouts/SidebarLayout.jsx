import Sidebar from "~/components/Sidebar";
import { useLocation } from "react-router-dom";
import { NAV_ITEMS } from "~/utils/contants";
import { HambergerIcon, XIcon } from "../components/Icons";
import { useEffect, useState } from "react";
import Flower from "../components/Flower";

function SidebarLayout({ children, name }) {
  const [isSidebarShow, setIsSidebarShow] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    const target = document.getElementById("main-sidebar");
    if (target) {
      if (isSidebarShow) {
        target.classList.add("hidden");
      } else {
        target.classList.remove("hidden");
      }
      setIsSidebarShow(!isSidebarShow);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const target = document.getElementById("main-sidebar");
      target.classList.add("hidden");
      setIsSidebarShow(false);
    }, 700);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="">
      <Sidebar />
      <div className="bg-neutral-200 min-h-screen">
        <header className="flex justify-between flex-row-reverse md:flex-row md:justify-end items-center bg-gradient-to-r from-primary-600 to-primary-300 h-42">
          <button
            className="text-primary-200 md:hidden px-4 md:px-16 cursor-pointer"
            onClick={toggleSidebar}
          >
            {isSidebarShow ? <XIcon /> : <HambergerIcon />}
          </button>
          <h1 className="text-primary-700 font-extrabold text-2xl px-4 md:px-16">
            {NAV_ITEMS.find((item) => item.path === location.pathname).name}
          </h1>
        </header>
        <main className="md:pl-30">
          <div className="md:relative bg-white -mt-12 mx-2 md:mr-8 rounded-lg p-4 min-h-[280px]">
            {children}

            {/* <Flower className="!w-50 !h-50 absolute right-0 bottom-0 rounded-lg md:bg-white bg-neutral-200"  /> */}
          </div>
        </main>
      </div>
    </div>
  );
}

export default SidebarLayout;
