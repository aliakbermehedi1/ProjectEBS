import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaLock, FaUser } from "react-icons/fa";

import { coreAxios } from "../../utilities/axios";
import { setUserSession } from "../../services/login";
import { establishConnection } from "../../actions/SignalR/SignalRAction";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from "../../constants/User/authConstants";

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
        navigator.geolocation.getCurrentPosition(resolve, reject);
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign In</h2>

        <div className="mb-4 flex items-center border rounded px-3 py-2 bg-gray-50">
          <FaUser className="text-gray-400 mr-2" />
          <input
            type="text"
            value={loginID}
            onChange={(e) => setLoginID(e.target.value)}
            placeholder="Username"
            className="flex-1 bg-transparent outline-none text-sm"
            required
          />
        </div>

        <div className="mb-4 flex items-center border rounded px-3 py-2 bg-gray-50">
          <FaLock className="text-gray-400 mr-2" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="flex-1 bg-transparent outline-none text-sm"
            required
          />
        </div>

        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default Login;
