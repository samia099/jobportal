import { Link, NavLink, Outlet, useNavigate } from "react-router";
import {
  FaUser,
  FaUsers,
  FaBriefcase,
  FaFileAlt,
  FaHome,
  FaSignOutAlt,
  FaBell,
  FaChartLine,
  FaSearch,
  FaBookmark,
} from "react-icons/fa";
import useCurrentUser from "../hooks/useCurrentUser";
import { Navigate } from "react-router";

const DashboardLayout = () => {
  const { user, loading, error,logout } = useCurrentUser();
  const navigate = useNavigate();

  const roleBasedLinks = {
    admin: [
      { name: "Dashboard", path: "", icon: <FaChartLine /> },
      { name: "Admin Profile", path: "profile", icon: <FaUser /> },
      { name: "Manage Users", path: "allUsers", icon: <FaUsers /> },
      { name: "Manage Jobs", path: "allJobs", icon: <FaBriefcase /> },
      { name: "Analytics", path: "analytics", icon: <FaChartLine /> },
    ],
    employer: [
      { name: "Dashboard", path: "", icon: <FaChartLine /> },
      { name: "Company Profile", path: "profile", icon: <FaUser /> },
      { name: "Post Job", path: "post-job", icon: <FaFileAlt /> },
      { name: "My Jobs", path: "jobs", icon: <FaBriefcase /> },
      { name: "Applications", path: "applications", icon: <FaFileAlt /> },
    ],
    jobseeker: [
      { name: "Dashboard", path: "", icon: <FaChartLine /> },
      { name: "My Profile", path: "profile", icon: <FaUser /> },
      { name: "Find Jobs", path: "jobs", icon: <FaSearch /> },
      { name: "Applications", path: "applications", icon: <FaFileAlt /> },
      { name: "Saved Jobs", path: "saved", icon: <FaBookmark /> },
    ],
  };



  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div
          className="animate-spin rounded-full h-12 w-12 border-b-2"
          style={{ borderColor: "#14B8A6" }}
        ></div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-red-600 text-center">
          <p className="text-lg font-semibold">Error: {error}</p>
        </div>
      </div>
    );

  if (!user) return <Navigate to="/signin" replace />;

  const linksToShow = roleBasedLinks[user.role] || [];

  return (
    <div className="flex  bg-gray-50">
      {/* Sidebar - Always visible */}
      <aside
        className="w-64 h-full text-white shadow-2xl"
        style={{ backgroundColor: "#2563EB" }}
      >
        <div className="p-6">
          {/* User Profile Section */}
          <div className="flex flex-col items-center mt-6 mb-8">
            <div className="relative">
              <img
                className="w-20 h-20 rounded-full border-4 border-white shadow-lg mb-3"
                src={user?.photo || "https://via.placeholder.com/80"}
                alt="User"
              />
              <div
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white"
                style={{ backgroundColor: "#14B8A6" }}
              ></div>
            </div>
            <h4 className="text-lg font-bold text-center text-white">
              {user?.name}
            </h4>
            <p className="text-sm text-blue-200 text-center">{user?.email}</p>
            <span
              className="mt-2 px-3 py-1 text-xs text-white rounded-full font-semibold shadow-md"
              style={{ backgroundColor: "#14B8A6" }}
            >
              {user?.role.toUpperCase()}
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="mt-8 mb-4">
            <ul className="space-y-2">
              {linksToShow.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 rounded-xl transition-all duration-300 group ${
                        isActive
                          ? "shadow-lg transform scale-105"
                          : "hover:bg-white/10 hover:shadow-md hover:translate-x-1"
                      }`
                    }
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? "#14B8A6" : undefined,
                    })}
                  >
                    <span className="mr-4 text-lg group-hover:scale-110 transition-transform">
                      {link.icon}
                    </span>
                    <span className="font-medium">{link.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="border-1 border-[#14B8A6]"></div>
          <div className="mt-4">
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/"
                  className="flex items-center px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                >
                  <FaHome className="mr-4 text-lg group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Home</span>
                </NavLink>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="w-full flex items-center px-4 py-3 rounded-xl hover:bg-red-500/20 transition-all duration-300 group hover:text-red-200"
                >
                  <FaSignOutAlt className="mr-4 text-lg group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Sign Out</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 ">
        {/* Header */}
        {/* <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border-2" style={{ borderColor: '#14B8A6' }}>
          <div className="flex items-center justify-between">
            <div>
              <h1 
                className="text-2xl font-bold"
                style={{ color: '#2563EB' }}
              >
                Welcome back, {user?.name.split(' ')[0]}!
              </h1>
              <p className="text-gray-600 mt-1">
                {user?.role === 'admin' ? 'Manage your platform' : 
                 user?.role === 'employer' ? 'Manage your job postings' : 
                 'Discover your next opportunity'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <FaBell 
                  className="h-6 w-6 cursor-pointer hover:opacity-80 transition-colors" 
                  style={{ color: '#14B8A6' }}
                />
                <div 
                  className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                  style={{ backgroundColor: '#2563EB' }}
                ></div>
              </div>
            </div>
          </div>
        </div> */}

        {/* Main Content Area */}
        <div className="bg-white">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
