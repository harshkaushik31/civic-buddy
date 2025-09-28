import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import { FileText, Search, Plus, User, LogOut, Menu, X, Minus } from "lucide-react";
import Link from "next/link";

function Sidebar({ response }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [complaintCount, setComplaintCount] = useState(0);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  const getComplaintCount = async ()=> {
      const complaint_count = await axios.get("/api/users/your-complaint-count");
      setComplaintCount(complaint_count.data.complaintsCount);
      console.log(complaint_count.data.complaintsCount);
  }

  const navigationItems = [
    {
      name: "Track Complaint",
      href: "/track-complaint",
      icon: Search,
      description: "Track your complaint status",
    },
    {
      name: "Your Complaints",
      href: "/your-complaints",
      icon: FileText,
      description: "View all your complaints",
    },
    {
      name: "Register Complaint",
      href: "/register-complaint",
      icon: Plus,
      description: "Submit a new complaint",
    },
    {
      name: "Delete Complaint",
      href: "/delete-complaint",
      icon: Minus,
      description: "Delte a complaint"
    }
  ];

  const isActivePage = (href) => {
    const fullPath = `/user-profile${href}`;
    return pathname === fullPath;
  };

  const handleNavigation = (href) => {
    router.push("/user-profile" + href);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const returnToHome = () => {
    window.location.href = "/user-profile";
    setIsMobileMenuOpen(false);
  };

  useEffect(()=>{
    getComplaintCount();
  },[complaintCount])

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 h-[100vh] bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-2xl z-40 transition-transform duration-300 ease-in-out
        md:translate-x-0 md:static md:z-auto
        ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }
        w-80 md:w-64
      `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-center">Complaint Portal</h2>
          </div>

          {/* User Information */}
          <div className="p-6 border-b border-gray-700">
            {response ? (
              <div className="space-y-3">
                <Link href={"/user-profile"} className="block">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
                      <User size={24} />
                    </div>
                    <div className="flex-1 min-w-0 hover:cursor-pointer">
                      <p className="font-semibold truncate">
                        {response.name || "User"}
                      </p>
                      <p className="text-blue-200 text-sm truncate">
                        {response.email || "No email"}
                      </p>
                    </div>
                  </div>
                </Link>
                <div className="bg-gray-800 rounded-lg p-3 border border-gray-500">
                  <p className="text-sm">
                    <span className="font-medium">Total Complaints: </span>
                    <span className="bg-gray-600 px-2 py-1 rounded-full text-xs">
                      {complaintCount}
                    </span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-600 rounded-full animate-pulse"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gray-600 rounded animate-pulse"></div>
                  <div className="h-3 bg-gray-700 rounded animate-pulse w-3/4"></div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePage(item.href);

                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item.href)}
                    className={`
                      w-full text-left p-4 rounded-xl transition-all duration-200 group
                      ${
                        isActive
                          ? "bg-white text-gray-900 shadow-lg transform scale-105"
                          : "text-blue-100 hover:bg-gray-700 hover:text-white hover:transform hover:scale-105"
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon
                        size={20}
                        className={`
                          ${
                            isActive
                              ? "text-gray-900"
                              : "text-gray-200 group-hover:text-white"
                          }
                        `}
                      />
                      <div className="flex-1">
                        <p
                          className={`font-medium ${
                            isActive ? "text-gray-900" : ""
                          }`}
                        >
                          {item.name}
                        </p>
                        <p
                          className={`text-xs opacity-75 ${
                            isActive ? "text-gray-700" : "text-gray-300"
                          }`}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Logout Button */}
          <div className="p-6 border-t border-gray-700">
            <button
              onClick={logout}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 hover:transform hover:scale-105 shadow-lg"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>

          {/* Debug Section - Remove in production */}
          {process.env.NODE_ENV === "development" && response && (
            <div className="p-4 border-t border-gray-700">
              <details>
                <summary className="text-xs text-gray-300 cursor-pointer hover:text-white">
                  Debug Info
                </summary>
                <pre className="mt-2 text-xs bg-gray-900 p-2 rounded overflow-auto max-h-32">
                  {JSON.stringify(response, null, 2)}
                </pre>
              </details>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
