import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaLock, FaUser } from "react-icons/fa";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from "../../constants/User/authConstants";
import { establishConnection } from "../../actions/SignalR/SignalRAction";
import { setUserSession } from "../../services/login";
import Logo1 from "../../assets/images/logo/dekko-logo.png";
import dekkoWhite from "../../assets/images/logo/dekko-logo.png";
import { coreAxios } from "../../utilities/axios";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginID, setLoginID] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    window.localStorage.clear();
    dispatch({ type: LOGIN_REQUEST });
    setLoading(true);
    setError("");

    try {
      const publicIP = await (
        await fetch("https://api.ipify.org?format=json")
      ).json();
      const privateIP = await (await fetch("/api/User/PrivateIP")).text();
      const coords = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (pos) => resolve(pos.coords),
          (error) => reject(error)
        );
      });

      const { data } = await coreAxios.post("/api/User/Login", {
        loginID,
        password,
        pcName: "myPC",
        publicIP: publicIP.ip,
        privateIP,
        latitude: coords.latitude,
        longitude: coords.longitude,
      });

      setUserSession(
        data.token,
        data.loginID,
        data.empID,
        data.comapanyID,
        data.departmentID,
        data.departmentName,
        data.designationID,
        data.designationName,
        data.lastLogin,
        data.lastLoginIP,
        data.lastLoginTime,
        data.roleID,
        data.roleName,
        data.userID,
        data.userName,
        data.isDeptHead,
        data.isSectionHead,
        data.isManagement,
        data.userImagePath,
        data.empSeatingLocationID,
        data.functionID,
        data.functionMgmtID,
        data.isCorporateEmployee,
        data.companyName
      );

      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          userID: data.userID,
          userName: data.userName,
        },
      });

      dispatch(establishConnection(data.token));
      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again later."
      );
      dispatch({
        type: "LOGIN_FAILED",
        payload: error.response,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/");
  }, [navigate]);

  return (
    <div className="pages-body login-page p-d-flex p-flex-column">
      <div className="topbar p-p-3 p-d-flex p-jc-between p-flex-row p-ai-center bg-[#1565C0]">
        <div className="topbar-left p-ml-3 p-d-flex">
          <div className="text-left font-bold text-2xl py-2">
            <img src={Logo1} alt="EBS 365" className="h-16 w-15" />
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center items-center h-[90vh]">
        <div className="flex flex-col items-center justify-center w-full flex-1 px-5 lg:px-20 text-center">
          <div className="w-full lg:w-2/3 md:w-1/2 max-w-4xl bg-white rounded-2xl shadow-2xl flex flex-col lg:flex-row">
            <div className="w-full lg:w-3/5 p-5">
              <div className="py-10">
                <h2
                  className="text-3xl font-bold text-black mb-2"
                  style={{ fontFamily: "serif" }}
                >
                  Sign In to your Account
                </h2>
                <div className="border-2 w-10 border-gray-200 inline-block mb-2"></div>
                <div className="flex flex-col items-center mt-8">
                  <form
                    onSubmit={handleLogin}
                    className="grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2"
                  >
                    <div className="bg-gray-100 w-full lg:w-64 p-2 flex items-center mb-3">
                      <FaUser className="text-gray-400 m-2" />
                      <input
                        type="text"
                        value={loginID}
                        onChange={(e) => setLoginID(e.target.value)}
                        placeholder="Username"
                        className="bg-gray-100 outline-none text-sm flex-1"
                      />
                    </div>
                    <div className="bg-gray-100 w-full lg:w-64 p-2 flex items-center mb-3">
                      <FaLock className="text-gray-400 m-2" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="bg-gray-100 outline-none text-sm flex-1"
                      />
                    </div>

                    {error && <div className="text-red-500 mb-2">{error}</div>}
                    <button
                      type="submit"
                      className="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-opacity-90 hover:text-white mt-2"
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Sign In"}
                    </button>
                  </form>
                </div>
              </div>
              <footer className="mt-4 text-center text-black text-sm">
                2022-{new Date().getFullYear()} © DEKKO
              </footer>
            </div>

            {/* Right Side Panel */}
            <div className="hidden md:block lg:w-3/6 bg-blue-600 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12 flex flex-col justify-between">
              <div className="md:w-40 sm:w-20 mx-auto h-40 rounded-full bg-white text-3xl text-black flex items-center justify-center font-bold">
                ERP
              </div>

              <div className="my-2 text-center items-center">
                <img
                  src={dekkoWhite}
                  alt="EBS 365"
                  className="h-14 w-15 mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
