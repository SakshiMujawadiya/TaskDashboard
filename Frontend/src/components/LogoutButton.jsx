
import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
