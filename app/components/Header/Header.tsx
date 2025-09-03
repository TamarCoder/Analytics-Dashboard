"use client";
import React, { useState } from "react";
import { Bell, Search, Settings, User, Menu, X } from "lucide-react";



const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header
      className="bg-gray-900 border-b border-gray-800 px-4 lg:px-6 h-20 flex items-center justify-between relative z-50"
      style={{ padding: "24px" }}
    >
      <div className="flex gap-[10px] items-center space-x-4 ">
        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors duration-200"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className="flex gap-[10px] items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <h1 className="text-xl font-semibold text-white hidden sm:block">
            Analytics
          </h1>
        </div>
      </div>

      <div className="hidden md:flex flex-2 max-w-lg mx-8">
        <div className="relative w-full">
         
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10 pointer-events-none"
            size={20}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search analytics..."
            className="w-full h-[40px] pl-12 pr-10 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            style={{
              paddingLeft: "35px",
            }}
          />
          {/* თუ რამე იწერება, ვაჩვენებთ გასუფთავების ღილაკს */}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-[20px] items-center space-x-3">
        {/* შეტყობინებების ღილაკი */}
        <button className="relative p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors duration-200">
          <Bell size={20} className="cursor-pointer" />
          <span className="absolute top-[-3px] right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
        </button>

        {/* პარამეტრების ღილაკი */}
        <button className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors duration-200">
          <Settings size={20} className="cursor-pointer" />
        </button>

        {/* მომხმარებლის პროფილი */}
        <div className="flex gap-[20px] items-center space-x-3 pl-3   border-gray-700">
          <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
            <User size={16} className="text-white cursor-pointer" />
          </div>
          <div className="hidden lg:block cursor-pointer">
            <p className="text-sm font-medium text-white  cursor-pointer">
              John Doe
            </p>
            <p className="text-xs text-gray-400 cursor-pointer">Admin</p>
          </div>
        </div>
      </div>

      {/* მობილური მენიუ - ჩანს მხოლოდ მობილურზე და მენიუს გახსნისას */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0   bg-opacity-50 lg:hidden z-40"
            onClick={toggleMenu}
          ></div>

          {/* მენიუ */}
          <div
            className="absolute top-full   gap-[20px] left-0 right-0 bg-gray-900 border-b border-gray-800 lg:hidden z-50"
            style={{
              padding: "10px",
            }}
          >
            <div className="p-4 flex flex-col gap-[20px]">
              <div className="relative mb-4">
                <Search
                  className="absolute  left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search analytics..."
                  className="w-full h-[40px] pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ paddingLeft: "35px" }}
                />
              </div>

              <nav className="space-y-2">
                <a
                  href="#"
                  className="block  px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200"
                  style={{
                    padding: "10px",
                  }}
                >
                  Dashboard
                </a>
                <a
                  href="#"
                  className="block px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200"
                  style={{
                    padding: "10px",
                  }}
                >
                  Reports
                </a>
                <a
                  href="#"
                  className="block px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200"
                  style={{
                    padding: "10px",
                  }}
                >
                  Settings
                </a>
              </nav>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
