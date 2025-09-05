"use client";
import { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  const [theme, setTheme] = useState("dark");

  return (
    <div className={` bg-gray-950 ${theme}`}>
      <div></div>
    </div>
  );
};

export default App;
