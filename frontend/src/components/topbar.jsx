import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; // ✅ useAuth, not useUser

export default function Topbar() {
  const { user, logout } = useAuth(); // ✅ get logout from context
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout(); // ✅ clear context + token
    navigate("/"); // or use window.location.href = "/";
  };

  return (
    <div className="topbar bg-amber-600 flex flex-row justify-between px-10 py-4 pr-20 relative">
      <div className="namelogo">
        <h2 className="text-white text-3xl font-extrabold">
          Welcome, {user?.name}
        </h2>
      </div>
      <ul className="links flex flex-row justify-center items-center gap-8 relative">
        <li className="text-white hover:underline cursor-pointer font-medium">
          <a href="/">Home</a>
        </li>
        <li className="text-white hover:underline cursor-pointer font-medium">
          <a href="#About">AboutUs</a>
        </li>
        <li className="text-white hover:underline cursor-pointer font-medium">
          <a href="#footer">Contact</a>
        </li>
        <li className="relative text-white hover:underline cursor-pointer font-medium">
          <span onClick={toggleDropdown}>MyProfile</span>
          {isDropdownOpen && (
            <ul className="absolute top-full bg-amber-700 shadow-md rounded mt-2 z-10">
              <li className="px-4 py-2 hover:bg-amber-900">
                <a href="/profilepage">Showprofile</a>
              </li>
              <li className="px-4 py-2 hover:bg-amber-900">
                <button
                  onClick={handleLogout}
                  className="home-button border-0 text-white hover:cursor-pointer"
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
}
