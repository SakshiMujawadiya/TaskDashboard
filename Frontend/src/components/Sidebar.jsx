import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkStyle =
    "flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-600 transition";

  const activeStyle = "bg-blue-700";

  return (
    <div className="w-64 h-200 bg-gray-800 text-white p-6 shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">
        🎓 Instructor Panel
      </h2>

      <nav className="flex flex-col gap-3 text-sm">
        <NavLink
          to="/instructor/trainees"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : ""}`
          }
        >
          📋 All Trainees
        </NavLink>

        <NavLink
          to="/instructor/module/new"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : ""}`
          }
        >
          🧩 Add Module
        </NavLink>

        <NavLink
          to="/instructor/insights"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : ""}`
          }
        >
          📊 Charts
        </NavLink>

        <NavLink
          to="/"
          className="flex items-center gap-2 px-4 py-2 text-red-400 hover:text-white hover:bg-red-500 rounded transition"
        >
          🚪 Logout
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
