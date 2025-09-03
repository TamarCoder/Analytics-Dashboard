import React, { useState } from "react";
import {
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
  Calendar,
  Filter,
  ChevronDown,
  ChevronRight,
  Home,
  FileText,
  Settings,
  HelpCircle,
} from "lucide-react";

// მხოლოდ დიზაინი - ყველა ლოგიკა ამოღებული
const Sidebar = ({ isOpen = true, onToggle } : any) => {
  // აქტიური მენიუს პუნქტის სტატუსი
  const [activeItem, setActiveItem] = useState("dashboard");

  // ქვე-მენიუების გაშლის სტატუსი - object-ში ვინახავთ თითოეული სექციის სტატუს
  const [expandedSections, setExpandedSections] = useState({
    analytics: false,
    reports: false,
    filters: true, // ფილტრები დეფოლტად გაშლილი
  });

  // ფუნქცია მენიუს პუნქტის აქტიური მდგომარეობის შესაცვლელად
  // რატომ: მომხმარებელმა უნდა იცოდეს სად იმყოფება
  const handleItemClick = (itemId: React.SetStateAction<string>) => {
    setActiveItem(itemId);
  };

  // ფუნქცია სექციის გასაშლელად/ჩასაკეცად
  // prevState - წინა მდგომარეობა, spread operator (...) - ობიექტის კოპირება
  const toggleSection = (sectionId: keyof typeof expandedSections) => {
    setExpandedSections((prevState) => ({
      ...prevState, // ყველა წინა მნიშვნელობის კოპირება
      [sectionId]: !prevState[sectionId], // მხოლოდ კონკრეტული სექციის შეცვლა
    }));
  };

  // მენიუს ძირითადი პუნქტების მასივი - ობიექტების array
  // რატომ ასე: მარტივად შეგვიძლია დინამიურად მენიუს გენერაცია და ცვლილება
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, badge: null },
    { id: "analytics", label: "Analytics", icon: BarChart3, badge: "5" },
    { id: "reports", label: "Reports", icon: FileText, badge: "NEW" },
    { id: "users", label: "Users", icon: Users, badge: null },
    { id: "settings", label: "Settings", icon: Settings, badge: null },
    { id: "help", label: "Help", icon: HelpCircle, badge: null },
  ];

  // ანალიტიკის ქვე-მენიუს პუნქტები
  const analyticsSubItems = [
    { id: "overview", label: "Overview", icon: TrendingUp },
    { id: "charts", label: "Charts", icon: PieChart },
    { id: "trends", label: "Trends", icon: TrendingUp },
  ];

  // რეპორტების ქვე-მენიუ
  const reportsSubItems = [
    { id: "daily", label: "Daily Reports" },
    { id: "weekly", label: "Weekly Reports" },
    { id: "monthly", label: "Monthly Reports" },
  ];

  // ფილტრების ოფციები - checkbox-ებისთვის
  const [filters, setFilters] = useState({
    dateRange: "last30days",
    category: "all",
    status: "active",
  });

  // ფილტრების ცვლილების ფუნქცია
  const handleFilterChange = (filterType: any, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  return (
    <>
      {/* Sidebar Container */}
       <aside className={`
          left-0 top-16   bg-gray-900 border-r border-gray-800 
        transition-transform duration-300 ease-in-out z-40
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        w-64 lg:translate-x-0
      `}
      style={{padding:'10px'}}>
        {/* Sidebar Header */}
        <div
          className="p-4 border-b border-gray-800"
          style={{ padding: "15px" }}
        >
          <h2 className="text-lg font-semibold text-white mb-2">Navigation</h2>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* Main Menu Items */}
          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const IconComponent = item.icon; // Dynamic component rendering
                const isActive = activeItem === item.id;

                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleItemClick(item.id)}
                      className={`
                        w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left
                        transition-colors duration-200 group
                        ${
                          isActive
                            ? "bg-blue-600 text-white shadow-lg"
                            : "text-gray-300 hover:text-white hover:bg-gray-800"
                        }
                      `}
                    >
                      <div className="flex items-center space-x-3">
                        <IconComponent
                          size={18}
                          className={
                            isActive
                              ? "text-white"
                              : "text-gray-400 group-hover:text-white"
                          }
                        />
                        <span className="font-medium">{item.label}</span>
                      </div>

                      {/* Badge Display - თუ არსებობს badge */}
                      {item.badge && (
                        <span
                          className={`
                          px-2 py-1 text-xs font-bold rounded-full
                          ${
                            item.badge === "NEW"
                              ? "bg-green-500 text-white"
                              : "bg-gray-700 text-gray-300"
                          }
                        `}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>

                    {/* Analytics Submenu */}
                    {item.id === "analytics" && (
                      <div className="ml-4 mt-2">
                        <button
                          onClick={() => toggleSection("analytics")}
                          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 mb-2"
                        >
                          {expandedSections.analytics ? (
                            <ChevronDown size={16} />
                          ) : (
                            <ChevronRight size={16} />
                          )}
                          <span className="text-sm">Analytics Options</span>
                        </button>

                        {expandedSections.analytics && (
                          <ul className="space-y-1 ml-4">
                            {analyticsSubItems.map((subItem) => {
                              const SubIconComponent = subItem.icon;
                              return (
                                <li key={subItem.id}>
                                  <button
                                    onClick={() => handleItemClick(subItem.id)}
                                    className={`
                                      w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left text-sm
                                      transition-colors duration-200
                                      ${
                                        activeItem === subItem.id
                                          ? "bg-blue-500 text-white"
                                          : "text-gray-400 hover:text-white hover:bg-gray-800"
                                      }
                                    `}
                                  >
                                    <SubIconComponent size={16} />
                                    <span>{subItem.label}</span>
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </div>
                    )}

                    {/* Reports Submenu */}
                    {item.id === "reports" && (
                      <div className="ml-4 mt-2">
                        <button
                          onClick={() => toggleSection("reports")}
                          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 mb-2"
                        >
                          {expandedSections.reports ? (
                            <ChevronDown size={16} />
                          ) : (
                            <ChevronRight size={16} />
                          )}
                          <span className="text-sm">Report Types</span>
                        </button>

                        {expandedSections.reports && (
                          <ul className="space-y-1 ml-4">
                            {reportsSubItems.map((subItem) => (
                              <li key={subItem.id}>
                                <button
                                  onClick={() => handleItemClick(subItem.id)}
                                  className={`
                                    w-full flex items-center px-3 py-2 rounded-md text-left text-sm
                                    transition-colors duration-200
                                    ${
                                      activeItem === subItem.id
                                        ? "bg-blue-500 text-white"
                                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                                    }
                                  `}
                                >
                                  <span>{subItem.label}</span>
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

         {/* Filters Section */}
          <div className="p-4 border-t border-gray-800">
            <div className="mb-3">
              <button
                onClick={() => toggleSection('filters')}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 mb-3"
              >
                <Filter size={18} />
                <span className="font-medium">Filters</span>
                {expandedSections.filters ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>

              {expandedSections.filters && (
                <div className="space-y-4 ml-6">
                  {/* Date Range Filter */}
                  <div style={{padding:'10px'}} className="flex flex-col gap-[10px]">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Date Range</label>
                    <select
                      value={filters.dateRange}
                      onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{
                        padding:'10px'
                    }}
                    >
                      <option value="today">Today</option>
                      <option value="last7days">Last 7 Days</option>
                      <option value="last30days">Last 30 Days</option>
                      <option value="last90days">Last 90 Days</option>
                      <option value="custom">Custom Range</option>
                    </select>
                  </div>

                  {/* Category Filter */}
                  <div style={{padding:'10px'}} className="flex flex-col gap-[10px]">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
                    <select
                      value={filters.category}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{padding:'10px'}}
                   >
                      <option value="all">All Categories</option>
                      <option value="sales">Sales</option>
                      <option value="marketing">Marketing</option>
                      <option value="support">Support</option>
                      <option value="development">Development</option>
                    </select>
                  </div>

                  {/* Status Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Status</label>
                    <div className="space-y-2 flex flex-col gap-1.5" style={{padding:'10px'}} >
                      {['active', 'inactive', 'pending'].map((status) => (
                        <label key={status} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="status"
                            value={status}
                            checked={filters.status === status}
                            onChange={(e) => handleFilterChange('status', e.target.value)}
                            className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500"
                            
                          />
                          <span className="text-sm text-gray-300 capitalize">{status}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  {/* Apply Filters Button */}
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200">
                    Apply Filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats in Sidebar */}
          <div className="p-4 border-t border-gray-800" style={{padding:'10px'}}>
            <h3 className="text-sm font-medium text-gray-400 mb-3">
              Quick Stats
            </h3>
            <div className="space-y-3 flex flex-col gap-2">

              <div className="bg-gray-800 rounded-lg p-3" style={{padding:'10px'}}>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Total Users</span>
                  <span className="text-sm font-medium text-white">12,543</span>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-3" style={{padding:'10px'}}>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Active Sessions</span>
                  <span className="text-sm font-medium text-green-400">
                    1,234
                  </span>
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg p-3" style={{padding:'10px'}}>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Conversion Rate</span>
                  <span className="text-sm font-medium text-blue-400">
                    3.2%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

       {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
          onClick={onToggle}
        ></div>
      )}


      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #374151;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #6b7280;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </>
  );
};

export default Sidebar;
