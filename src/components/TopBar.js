import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Left and Right arrow icons
import Dekkologo from "../assets/images/logo/dekko-logo.png";

const TopBar = ({ collapsed, setCollapsed }) => {
  return (
    <div className="bg-[#1565C0] text-white py-2 fixed w-full top-0 left-0 z-10 flex items-center justify-between">
      <div className="flex items-center justify-center w-72 ml-2">
        {/* Logo and Title */}
        <img src={Dekkologo} alt="DEKKO" className="w-44 h-10" />
      </div>

      <div className="flex items-center justify-between space-x-4 w-full mr-2">
        {/* Sidebar Toggle */}
        <div
          className="cursor-pointer text-xl bg-[#FBC02D] p-3 text-gray-800 rounded-full"
          onClick={() => setCollapsed((prev) => !prev)} // Toggle Sidebar Collapse
        >
          {/* Conditionally render the left or right arrow icon */}
          {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </div>

        <div className="text-2xl font-bold">Mehedi</div>
      </div>
    </div>
  );
};

export default TopBar;
