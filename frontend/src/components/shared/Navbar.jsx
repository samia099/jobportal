import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  User,
  Bell,
  ChevronDown,
  LayoutDashboard,
  UserCircle,
} from "lucide-react";
import useCurrentUser from "../../hooks/useCurrentUser";
import logo from "../../assets/bdJobBox.png";

const Navbar = () => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("home");
  const { user, logout } = useCurrentUser();

  const navItems = [
    { id: "home", label: "Home", path: "/" },
    { id: "jobs", label: "Find Jobs", path: "/jobsAll", badge: "Hot" },
    { id: "companies", label: "Companies", path: "/companies" },
    { id: "about", label: "About", path: "/about" },
    { id: "contact", label: "Contact", path: "/contact" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isUserDropdownOpen &&
        !event.target.closest(".user-dropdown") &&
        !event.target.closest(".user-avatar")
      ) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isUserDropdownOpen]);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b-2 border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 cursor-pointer group">
            <img 
              src={logo} 
              alt="bdJobBox" 
              className="w-52 transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="bg-gray-50 rounded-2xl p-2 flex items-center space-x-1 shadow-sm">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setActiveItem(item.id)}
                className={`relative px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeItem === item.id
                    ? "bg-blue-600 text-white shadow-lg transform scale-105"
                    : "text-gray-700 hover:text-teal-600 hover:bg-white hover:shadow-md"
                }`}
                style={{
                  backgroundColor: activeItem === item.id ? '#2563EB' : undefined
                }}
              >
                {item.label}
                {item.badge && (
                  <span 
                    className="absolute -top-1 -right-1 text-white text-xs px-2 py-1 rounded-full font-bold"
                    style={{ backgroundColor: '#14B8A6' }}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Notification Bell */}
                <div className="relative">
                  <Bell 
                    className="h-6 w-6 text-gray-600 cursor-pointer hover:transition-colors duration-300" 
                    style={{ color: '#14B8A6' }}
                  />
                  <div 
                    className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                    style={{ backgroundColor: '#2563EB' }}
                  ></div>
                </div>

                {/* User Dropdown */}
                <div className="relative user-dropdown">
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center space-x-3 bg-gray-50 rounded-xl px-4 py-2 hover:bg-gray-100 transition-all duration-300 border-2"
                    style={{ borderColor: '#14B8A6' }}
                  >
                    <div 
                      className="w-9 h-9 rounded-full flex items-center justify-center shadow-md"
                      style={{ backgroundColor: '#2563EB' }}
                    >
                      <span className="text-white font-bold text-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="font-medium text-gray-800">
                      {user.name.split(" ")[0]}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${
                        isUserDropdownOpen ? "transform rotate-180" : ""
                      }`}
                      style={{ color: '#14B8A6' }}
                    />
                  </button>

                  {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-2xl py-2 z-50 border-2" style={{ borderColor: '#14B8A6' }}>
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-800">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      
                      <Link
                        to="/dashboard"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-all duration-200"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <LayoutDashboard 
                          className="h-4 w-4 mr-3" 
                          style={{ color: '#2563EB' }}
                        />
                        Dashboard
                      </Link>
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-all duration-200"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <UserCircle 
                          className="h-4 w-4 mr-3" 
                          style={{ color: '#2563EB' }}
                        />
                        Profile
                      </Link>
                      <div className="border-t border-gray-100 my-1"></div>
                      <button
                        onClick={() => {
                          logout();
                          setIsUserDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-all duration-200"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300"
                  style={{ color: '#2563EB' }}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="text-white px-8 py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  style={{ backgroundColor: '#14B8A6' }}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;