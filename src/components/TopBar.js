import { useDispatch, useSelector } from "react-redux";
import Dekkologo from "../assets/images/logo/dekko-logo.png";
import { coreAxios } from "../utilities/axios";
import { closeConnection } from "../actions/SignalR/SignalRAction";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userID = localStorage.getItem("userID");

  const handleLogout = async () => {
    try {
      await coreAxios.post(`/api/User/Logout?userID=${userID}`);
      dispatch(closeConnection());
      localStorage.clear();
      window.location.reload();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="bg-[#1565C0] text-white py-2 fixed w-full top-0 left-0 z-10 flex items-center justify-between px-4">
      {/* Logo on the left */}
      <div className="flex items-center">
        <img src={Dekkologo} alt="DEKKO" className="w-40 h-10" />
      </div>

      {/* Logout button on the right */}
      <button
        onClick={handleLogout}
        className="text-sm border-2 border-yellow-300 text-white rounded-full px-6 py-1 font-semibold hover:border-yellow-500"
      >
        Logout
      </button>
    </div>
  );
};

export default TopBar;
