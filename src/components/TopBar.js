import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Dekkologo from "../assets/images/logo/dekko-logo.png";
import { coreAxios } from "../utilities/axios";
import { closeConnection } from "../actions/SignalR/SignalRAction";
import { useNavigate } from "react-router-dom";

const TopBar = ({ collapsed, setCollapsed }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userID = localStorage.getItem("userID");

  // In TopBar.js
  const handleLogout = async () => {
    try {
      await coreAxios.post(`/api/User/Logout?userID=${userID}`);
      dispatch(closeConnection());
      localStorage.clear();

      // Force state reset in two ways:
      window.location.reload(); // Quick fix to reset all states
      navigate("/login"); // Proper SPA navigation
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!isAuthenticated) return null; // or render something else if needed

  return (
    <div className="bg-[#1565C0] text-white py-2 fixed w-full top-0 left-0 z-10 flex items-center justify-between">
      <div className="flex items-center justify-center w-72 ml-2">
        <img src={Dekkologo} alt="DEKKO" className="w-44 h-10" />
      </div>

      <div className="flex items-center justify-between space-x-4 w-full mr-5">
        <div
          className="cursor-pointer text-xl bg-[#FBC02D] p-2 text-gray-800 rounded-full"
          onClick={() => setCollapsed((prev) => !prev)}
        >
          {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </div>

        <div className="flex items-center justify-between gap-3">
          <button
            onClick={handleLogout}
            className="border-2 border-yellow-300 text-white rounded-full mt-2 px-8 py-2 inline-block font-semibold hover:border-yellow-500"
          >
            Logout
          </button>
          <div className="text-2xl font-bold">TEST NAME</div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
