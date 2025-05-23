import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Link } from "react-router-dom";

import avatar from "../data/Avatar.png";
import { Cart, Chat, Notification, UserProfile } from ".";
import { useStateContext } from "../contexts/ContextProvider";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={customFunc}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-gray-100
       dark:hover:bg-gray-700 transition-colors duration-200" // Improved hover effect
    >
      {dotColor && (
        <span
          style={{ background: dotColor }}
          className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
        />
      )}
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = ({ onLogout }) => {
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
    currentMode,
  } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize, setActiveMenu]);

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div
      className={`fixed top-0 left-0 w-full ${
        currentMode === "Dark" ? "bg-gray-800" : "bg-white"
      } shadow-md z-50 transition-colors duration-200`}
    >
      {" "}
      {/* Dynamic background based on mode */}
      <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative items-center">
        {" "}
        {/* Added items-center */}
        <NavButton
          title="Menu"
          customFunc={handleActiveMenu}
          color={currentColor}
          icon={<AiOutlineMenu />}
        />
        <div className="flex-grow flex justify-center md:justify-start items-center">
          {" "}
          {/* Centered on mobile, left on desktop */}
          <Link
            to="/"
            onClick={handleCloseSideBar}
            className={`flex items-center gap-3 text-xl font-extrabold tracking-tight ${
              currentMode === "Dark" ? "text-white" : "text-slate-900"
            } transition-colors duration-200`} // Dynamic text color
          >
            <img
              src="https://astrowebsolution.com/assets/img/logo.jpg"
              alt="Logo"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="hidden md:block">Astro Web Solutions</span>{" "}
            {/* Hide text on mobile */}
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {" "}
          {/* Added gap-4 */}
          {/* <NavButton
            title="Cart"
            customFunc={() => handleClick("cart")}
            color={currentColor}
            icon={<FiShoppingCart />}
          /> */}
          {/* <NavButton
            title="Chat"
            dotColor="#03C9D7"
            customFunc={() => handleClick("chat")}
            color={currentColor}
            icon={<BsChatLeft />}
          /> */}
          <NavButton
            title="Notification"
            dotColor="rgb(254, 201, 15)"
            customFunc={() => handleClick("notification")}
            color={currentColor}
            icon={<RiNotification3Line />}
          />
          <TooltipComponent content="Profile" position="BottomCenter">
            <div
              className={`flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200`} // Improved hover effect
              onClick={() => handleClick("userProfile")}
            >
              <img
                className="rounded-full w-8 h-8"
                src={avatar}
                alt="user-profile"
              />
              <p
                className={`text-sm ${
                  currentMode === "Dark" ? "text-gray-300" : "text-gray-400"
                } transition-colors duration-200`}
              >
                {" "}
                {/* Dynamic text color */}
                Hi, <span className="font-bold ml-1">Admin</span>
              </p>
              <MdKeyboardArrowDown
                className={`text-sm ${
                  currentMode === "Dark" ? "text-gray-300" : "text-gray-400"
                } transition-colors duration-200`}
              />{" "}
              {/* Dynamic text color */}
            </div>
          </TooltipComponent>
          {isClicked.cart && <Cart />}
          {isClicked.chat && <Chat />}
          {isClicked.notification && <Notification />}
          {isClicked.userProfile && <UserProfile onLogout={onLogout} />}
        </div>
        {/* Mobile close button */}
        <TooltipComponent content="Close Menu" position="BottomCenter">
          <button
            type="button"
            onClick={() => setActiveMenu(false)}
            style={{ color: currentColor }}
            className="text-xl rounded-full p-3 hover:bg-gray-100 dark:hover:bg-gray-700 mt-4 block md:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </TooltipComponent>
      </div>
    </div>
  );
};

export default Navbar;
