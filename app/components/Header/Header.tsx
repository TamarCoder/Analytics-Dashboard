"use client";
import React, { useState } from "react";
import {
  BarChart3,
  Bell,
  Search,
  Settings,
  User,
  ChevronDown,
  Menu,
  TrendingUp,
  Users,
  DollarSign,
  ShoppingCart,
  Target,
  Activity,
} from "lucide-react";
import Realtime from "./RealTime/Realtime";
import { useRouter, usePathname } from "next/navigation"; // Next.js router
import { MenuItem } from "../types/dashboard.types";

const Header: React.FC = () => {
  const [isSearchText, setIsSearchText] = useState("");
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Next.js router hooks
  const router = useRouter();
  const pathname = usePathname();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setIsSearchText(e.target.value);
  };

  const handleNotificationToggle = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Navigation handler ფუნქცია
  const handleNavigation = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false); // მობაილ მენიუს დახურვა
  };

  // Active state checker
  const isActiveRoute = (path: string) => {
    return pathname === path;
  };

  const menuItems: MenuItem[] = [
    { icon: BarChart3, label: "Dashboard", path: "/dashboard" },
    { icon: TrendingUp, label: "Analytics", path: "/analytics" },
    { icon: Users, label: "Users", path: "/users" },
    { icon: DollarSign, label: "Revenue", path: "/revenue" },
    { icon: ShoppingCart, label: "Orders", path: "/orders" },
    { icon: Target, label: "Goals", path: "/goals" },
    { icon: Activity, label: "Reports", path: "/reports" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <>
      <header className="bg-gray-900 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and title */}
          <div className="flex items-center space-x-3">
            <div className="flex md:flex lg:hidden bg-gray-800 rounded-lg px-2 py-1 cursor-pointer hover:bg-gray-700 transition-colors">
              <Menu
                className="flex md:flex lg:hidden items-center max-w-md cursor-pointer h-5 w-5 text-white"
                onClick={handleMobileMenuToggle}
              />
            </div>

            <div className="flex items-center space-x-3">
              <BarChart3 className="h-6 w-6 text-white cursor-pointer" />
            </div>

            <div className="flex flex-col gap-[3px]">
              <h1 className="text-xl font-bold text-white">
                Analytics Dashboard
              </h1>
              <Realtime />
            </div>
          </div>

          {/* Search bar */}
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
            <div className="relative">
              <button
                onClick={handleNotificationToggle}
                className="p-2 cursor-pointer text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200"
              >
                <Bell className="h-5 w-5" />
              </button>

              {/* Notifications dropdown */}
              {isNotificationOpen && (
                <div className="absolute right-0 top-12 w-64 bg-gray-800 text-white rounded-lg shadow-lg z-50 ring-1 ring-gray-600">
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-medium">Notifications</p>
                      <span className="text-xs cursor-pointer text-blue-400 hover:text-blue-300">
                        Clear all
                      </span>
                    </div>

                    {/* Notification items */}
                    <div className="space-y-2">
                      <div className="text-xs text-gray-400 text-center py-4">
                        No new notifications
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-700 pt-2 mt-2 text-center">
                      <p className="text-xs cursor-pointer text-blue-400 hover:text-blue-300">
                        View All
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button className="p-2 cursor-pointer text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200">
              <Settings className="h-5 w-5" />
            </button>

            <div className="relative inline-block">
              {/* User menu button */}
              <div
                onClick={handleUserMenuToggle}
                className="flex items-center space-x-2 bg-gray-800 rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-700 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="text-white text-sm hidden md:block">
                  John Doe
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                    isUserMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </div>

              {/* User Dropdown menu */}
              {isUserMenuOpen && (
                <div className="absolute top-12 right-0 w-[200px] bg-gray-800 text-white rounded-lg shadow-lg ring-1 ring-gray-600 ring-opacity-50 z-10">
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

      {/* Mobile Menu */}
      <div
        className={`bg-gray-800 w-full flex flex-col md:flex lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen
            ? "h-auto opacity-100 translate-y-0"
            : "h-0 opacity-0 -translate-y-4"
        }`}
      >
        <div
          className=" w-full h-[50px]  flex items-center  bg-gray-800 rounded-lg  "
          style={{ paddingLeft: "10px", paddingRight: "10px" }}
        >
          <Search className="h-5 w-5 text-gray-400 mr-3 cursor-pointer" />
          <input
            onChange={handleSearchChange}
            value={isSearchText}
            type="text"
            placeholder="Search metrics, reports..."
            className="bg-transparent text-white placeholder-gray-400 flex-1 outline-none border-b"
          />
        </div>
        <nav className="w-full p-4 space-y-2">
          {menuItems.map((item, index) => {
            const isActive = isActiveRoute(item.path);

            return (
              <button
                key={index}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group text-left ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-700"
                }`}
              >
                <item.icon
                  className={`h-5 w-5 ${
                    isActive ? "text-white" : "group-hover:text-blue-400"
                  }`}
                />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Header;
