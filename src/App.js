import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import About from "./pages/about/About";
import Sidebar from "./components/Sidebar"; // Sidebar component
import TopBar from "./components/TopBar"; // TopBar component

function App() {
  const [collapsed, setCollapsed] = useState(false); // Manage sidebar collapse state

  return (
    <Router>
      <div className="flex h-screen">
        {/* TopBar (Fixed) */}
        <TopBar collapsed={collapsed} setCollapsed={setCollapsed} />{" "}
        {/* Pass collapsed state to TopBar */}
        {/* Sidebar */}
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />{" "}
        {/* Pass collapsed state to Sidebar */}
        {/* Main content area */}
        <div
          className={`flex-1 flex flex-col transition-all duration-300 ${
            collapsed ? "ml-20" : "ml-64"
          }`} // Content moves based on sidebar collapse state
        >
          {/* Content */}
          <div className="flex-1 p-6 overflow-auto bg-gray-100">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
