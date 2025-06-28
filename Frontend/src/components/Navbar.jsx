import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");

  // Pages where Navbar should not show (login/register)
  const hideOnPaths = ["/", "/login", "/register", "/account-settings"];
  if (hideOnPaths.includes(location.pathname)) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-indigo-600 text-white px-6 py-3 shadow-md flex justify-between items-center">
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Training Portal
      </h1>

      <div className="flex items-center gap-4">
        {token && (
          <>
            <button
              onClick={() => navigate("/account-settings")}
              className="bg-white text-indigo-600 px-3 py-1 rounded text-sm hover:bg-gray-100"
            >
              Update Account
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
