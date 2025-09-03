"use client";
import { useState } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
 
 

const App = () => {
  const [theme, setTheme] = useState("dark");
  const [sidebarOpen, setSidebarOpen] = useState(true);
   const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={`min-h-screen h-[300px] bg-gray-950 ${theme}`}>
      <Header/>
      <Sidebar isOpen={sidebarOpen} onToggle={() =>  setIsMenuOpen(!isMenuOpen)}/>
      
    </div>
  );
};

export default App;
