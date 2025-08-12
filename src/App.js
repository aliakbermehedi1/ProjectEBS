import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./services/login";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard";
import TopBar from "./components/TopBar";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(loadUser());
    } else if (location.pathname !== "/login") {
      navigate("/login");
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
        <div className="flex flex-col h-screen">
          {/* TopBar stays fixed at top */}
          <TopBar />

          {/* Main content fills the rest of the screen */}
          <main className="flex-1 overflow-hidden">
            <div className="h-full p-6 overflow-auto bg-gray-100">
              <Routes>
                <Route path="/" element={<Dashboard />} />
              </Routes>
            </div>
          </main>
        </div>
      )}
    </>
  );
}

export default App;
