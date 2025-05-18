import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./services/login";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [collapsed, setCollapsed] = useState(false); // Keep collapsed state

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(loadUser());
    } else {
      if (location.pathname !== "/login") navigate("/login");
    }
  }, [dispatch, navigate, location]);

  return (
    <>
      {!isAuthenticated ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Login />} />
        </Routes>
      ) : (
        <div className="flex h-screen">
          {/* Pass collapsed state to TopBar and Sidebar */}
          <TopBar collapsed={collapsed} setCollapsed={setCollapsed} />
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

          {/* Keep dynamic margin based on collapsed state */}
          <main
            className={`flex-1 flex flex-col transition-all duration-300 ${
              collapsed ? "ml-0" : "ml-64"
            }`}
          >
            <div className="flex-1 p-6 overflow-auto bg-gray-100">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                {/* Add other protected routes here */}
              </Routes>
            </div>
          </main>
        </div>
      )}
    </>
  );
}

export default App;
