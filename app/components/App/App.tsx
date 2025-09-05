"use client";
import { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";

const App = () => {
  const [theme, setTheme] = useState("dark");

  return (
    <div className={` bg-gray-950 ${theme}`}>
      <div>
        <Dashboard/>
      </div>
    </div>
  );
};

export default App;
