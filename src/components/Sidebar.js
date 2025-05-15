import React, { useState } from "react";
import { FaHome, FaCog, FaChevronDown, FaUser, FaFile } from "react-icons/fa"; // Example icons

const Sidebar = ({ collapsed, setCollapsed }) => {
  const [menuOpen, setMenuOpen] = useState(null);

  const toggleMenu = (index) => {
    setMenuOpen(menuOpen === index ? null : index);
  };

  return (
    <div
      className={`flex flex-col h-screen bg-white text-black transition-all duration-300 ${
        collapsed ? "w-0 opacity-0" : "w-64 opacity-100"
      }`} // Sidebar width and opacity change
      style={{
        transform: collapsed ? "translateX(-200%)" : "translateX(0)", // Move the sidebar further off-screen
        position: "fixed", // Sidebar fixed on the left side of the screen
        top: 72, // Start from below the topbar (height of the top bar)
        left: 0, // Align it to the left
        zIndex: 100, // Ensure it's above other content
      }}
    >
      {/* Menu Items */}
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

                {/* Text */}
                <span
                  className={`transition-all duration-300 ${
                    collapsed ? "hidden" : "block"
                  }`}
                >
                  {item}
                </span>

                {/* Expand Icon */}
                <FaChevronDown
                  className={`ml-auto transition-all duration-300 ${
                    menuOpen === index ? "rotate-180" : ""
                  }`}
                />
              </div>

              {/* Submenu */}
              {menuOpen === index && !collapsed && (
                <div className="pl-6 transition-all duration-300">
                  {["Submenu 1", "Submenu 2"].map((submenu, subIndex) => (
                    <div
                      key={subIndex}
                      className="p-4 text-sm hover:bg-[#F3F4F5] cursor-pointer transition-all duration-300"
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
