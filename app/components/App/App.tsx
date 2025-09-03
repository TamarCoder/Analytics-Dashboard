"use client";
import { useState } from "react";
import Header from "../Header/Header";
 

const App = () => {
  const [theme, setTheme] = useState("dark");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className={`min-h-screen h-[300px] bg-gray-950 ${theme}`}>
      <Header />
      
    </div>
  );
};

export default App;
