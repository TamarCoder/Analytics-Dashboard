"use client";
import { useState } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
 
 
 

const App = () => {
  const [theme, setTheme] = useState("dark");
   
  return (
    <div className={`min-h-screen   bg-gray-950 ${theme}`}>
      <Header/>
      <div className="flqex">
        <Sidebar/>
      </div>
    
    </div>
  );
};

export default App;
