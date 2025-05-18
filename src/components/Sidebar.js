import React, { useState } from "react";
import { FaHome, FaCog, FaChevronDown, FaUser, FaFile } from "react-icons/fa";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const [menuOpen, setMenuOpen] = useState(null);

  const toggleMenu = (index) => {
    setMenuOpen(menuOpen === index ? null : index);
  };

  return (
    <div
      className={`flex flex-col h-screen bg-white text-black transition-all duration-300  w-64 ${
        collapsed ? "pointer-events-none" : "pointer-events-auto"
      }`}
      style={{
        transform: collapsed ? "translateX(-100%)" : "translateX(0)",
        opacity: collapsed ? 0 : 1,
        position: "fixed",
        top: 72,
        left: 0,
        zIndex: 100,
      }}
    >
      <div className="flex flex-col mt-4">
        {["Admin", "Human Resource", "Inventory", "Procurement"].map(
          (item, index) => (
            <div key={index} className="relative">
              <div
                className="p-4 hover:bg-[#F3F4F5] cursor-pointer flex items-center transition-all duration-300"
                onClick={() => toggleMenu(index)}
              >
                {/* Icons */}
                {item === "Admin" && <FaHome className="inline-block mr-2" />}
                {item === "Human Resource" && (
                  <FaUser className="inline-block mr-2" />
                )}
                {item === "Inventory" && (
                  <FaCog className="inline-block mr-2" />
                )}
                {item === "Procurement" && (
                  <FaFile className="inline-block mr-2" />
                )}

                {/* Text - Removed conditional visibility */}
                <span className="transition-all duration-300">{item}</span>

                <FaChevronDown
                  className={`ml-auto transition-transform duration-300 ${
                    menuOpen === index ? "rotate-180" : ""
                  }`}
                />
              </div>

              {menuOpen === index && !collapsed && (
                <div className="pl-6 transition-all duration-300">
                  {["Submenu 1", "Submenu 2"].map((submenu, subIndex) => (
                    <div
                      key={subIndex}
                      className="p-4 text-sm hover:bg-[#F3F4F5] cursor-pointer"
                    >
                      {submenu}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Sidebar;
