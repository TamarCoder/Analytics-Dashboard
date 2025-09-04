"use client";
import React, { useState } from "react";
import {
  BarChart3,
  Bell,
  Search,
  Settings,
  User,
  ChevronDown,
} from "lucide-react";

const Header: React.FC = () => {
  const [isSearchText, setIsSearchText] = useState("");
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleSearchChange = (e: any) => {
    console.log(e.target.value);
    setIsSearchText(e.target.value);
  };

  const handleNotificationToggle = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <header className="bg-gray-900 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* {logo  and title} */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-3">
            <BarChart3 className="h-6 w-6 text-white cursor-pointer" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">
              Analytics Dashboard
            </h1>
            <p className="text-sm text-gray-400">Real-time business insights</p>
          </div>
        </div>

        {/* {Search bar} */}

        <div className="hidden md:flex items-center bg-gray-800 rounded-lg px-4 py-2 max-w-md flex-1 mx-8">
          <Search className="h-5 w-5 text-gray-400 mr-3 cursor-pointer" />
          <input
            onChange={handleSearchChange}
            value={isSearchText}
            type="text"
            placeholder="Search metrics, reports..."
            className="bg-transparent text-white placeholder-gray-400 flex-1 outline-none"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button className="p-2 cursor-pointer text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200">
            <Bell
              className="h-5 w-5 cursor-pointer"
              onClick={handleNotificationToggle}
            />
          </button>
          {/* Notifications dropdown  */}
          {isNotificationOpen && (
            <div
              className="absolute right-55 top-16 w-64 bg-gray-800 text-white rounded-lg shadow-lg z-50 flex flex-col gap-2.5 justify-between"
              style={{
                padding: "10px",
              }}
            >
              <div className="w-full flex items-center justify-between">
                <p style={{ fontSize: "12px" }}>Notfication</p>
                <span style={{ fontSize: "12px", cursor: "pointer" }}>
                  Clear all
                </span>
              </div>
              {/* contains notification items */}
              <div>{/* აქ უნდა იყოს შემოსული შეტყობინებები */}</div>
              {/* footer */}
              <div className="w-full border-t border-gray-700 flex items-center justify-center">
                <p style={{ fontSize: "12px", cursor: "pointer" }}>Wiew All</p>
              </div>
            </div>
          )}
          <button className="p-2 cursor-pointer text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200">
            <Settings className="h-5 w-5 cursor-pointer" />
          </button>
          <div className="relative inline-block">
            {/* მთავარი ღილაკი */}
            <div  onClick={handleUserMenuToggle} className="flex items-center space-x-2 bg-gray-800 rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-700 transition-colors">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <span className="text-white text-sm hidden md:block">
                John Doe
              </span>
              <ChevronDown
                className={`h-4 w-4 text-gray-400 transition-transform duration-200 `}
                
              />
            </div>

            {/* User Dropdown მენიუ */}
            {isUserMenuOpen && (
              <div className="absolute top-13 right-0 w-[200px] bg-gray-800 text-white rounded-lg shadow-lg ring-1 ring-gray-600 ring-opacity-50 z-10">
                <ul className="flex flex-col gap-[10px] p-4">
                  <li className="cursor-pointer hover:bg-gray-700 hover:text-gray-100 px-2 py-1 rounded transition-colors">
                    Profile Settings
                  </li>
                  <li className="cursor-pointer hover:bg-gray-700 hover:text-gray-100 px-2 py-1 rounded transition-colors">
                    Theme
                  </li>
                  <li className="cursor-pointer hover:bg-gray-700 hover:text-gray-100 px-2 py-1 rounded transition-colors">
                    Language
                  </li>
                  <li className="cursor-pointer hover:bg-gray-700 hover:text-gray-100 px-2 py-1 rounded transition-colors border-t border-gray-600 pt-2 mt-2">
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
