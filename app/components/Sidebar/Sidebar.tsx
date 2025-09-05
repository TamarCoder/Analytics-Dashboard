"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation"; // Next.js router
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import { SubMenuItem } from "../types/dashboard.types";
import { menuItems } from "./menu.types";

const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string[]>([]);
  const [isSearchText, setIsSearchText] = useState("");

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const isActiveRoute = (path: string) => {
    return pathname === path;
  };

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };
  const hasActiveSubmenu = (submenu?: SubMenuItem[]) => {
    if (!submenu) return false;
    return submenu.some((item) => item.path === pathname);
  };

  const isMenuOpen = (label: string) => {
    return (
      openSubmenu.includes(label) ||
      hasActiveSubmenu(menuItems.find((item) => item.label === label)?.submenu)
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setIsSearchText(e.target.value);
  };

   const filteredItems = menuItems.filter(item =>
      item.label.toLowerCase().includes(isSearchText.toLowerCase())
    );

  return (
    <aside className="bg-gray-900 border-r border-gray-700 w-64  flex-col  sticky  min-h-screen    hidden lg:block" style={{padding:'10px'}}>

      <div className=" w-full h-[50px]  flex items-center  bg-gray-800 rounded-lg  "  
        
        style={{paddingLeft: '10px', paddingRight: '10px',  }}>
        <Search className="h-5 w-5 text-gray-400 mr-3 cursor-pointer" />
        <input
          onChange={handleSearchChange}
          value={isSearchText}
          type="text"
          placeholder="Search metrics, reports..."
          className="bg-transparent text-white placeholder-gray-400 flex-1 outline-none"
        />
      </div>

      <nav className="space-y-2" style={{marginTop:'20px'}}  >
        {filteredItems.map((item, index) => {
          const isActive = isActiveRoute(item.path);
          const hasSubmenu = item.submenu && item.submenu.length > 0;
          const isOpen = isMenuOpen(item.label);
          const hasActiveChild = hasActiveSubmenu(item.submenu);

          return (
            <div key={index}>
              <button
                onClick={() => {
                  if (hasSubmenu) {
                    toggleSubmenu(item.label);
                  } else if (item.path) {
                    handleNavigation(item.path);
                  }
                }}
                className={`w-full cursor-pointer flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group text-left ${
                  isActive || hasActiveChild
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
              >
                <item.icon
                  className={`h-5 w-5 ${
                    isActive || hasActiveChild
                      ? "text-white"
                      : "group-hover:text-blue-400"
                  }`}
                />
                <span className="font-medium">{item.label}</span>

                {hasSubmenu && (
                  <div className="ml-auto">
                    {isOpen ? (
                      <ChevronDown className="h-4 w-4 cursor-pointer" />
                    ) : (
                      <ChevronRight className="h-4 w-4 cursor-pointer" />
                    )}
                  </div>
                )}

                {isActive && !hasSubmenu && (
                  <div className="ml-auto cursor-pointer w-2 h-2 bg-white rounded-full"></div>
                )}
              </button>

              {hasSubmenu && (
                <div
                  className={`ml-4 mt-1 cursor-pointer space-y-1 transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {item.submenu?.map((subItem, subIndex) => {
                    const isSubActive = isActiveRoute(subItem.path);
                    const SubIcon = subItem.icon;

                    return (
                      <button
                        key={subIndex}
                        onClick={() => handleNavigation(subItem.path)}
                        className={`w-full flex cursor-pointer items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 group text-left text-sm ${
                          isSubActive
                            ? "bg-blue-500 text-white"
                            : "text-gray-500 hover:text-white hover:bg-gray-800"
                        }`}
                      >
                        {SubIcon && (
                          <SubIcon
                            className={`h-4 w-4 cursor-pointer ${
                              isSubActive
                                ? "text-white"
                                : "group-hover:text-blue-400"
                            }`}
                          />
                        )}
                        <span>{subItem.label}</span>

                        {isSubActive && (
                          <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full"></div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
