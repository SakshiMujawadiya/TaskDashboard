import React from "react";

const ModuleList = ({ modules, toggleModule }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-xl font-semibold mb-4">Assigned Modules</h2>
      <ul className="space-y-3">
        {modules.map((module) => (
          <li key={module._id} className="flex items-center">
            <input
              type="checkbox"
              checked={module.completed}
              onChange={() => toggleModule(module._id)} 
              className="mr-3"
            />
            <span
              className={`${
                module.completed ? "line-through text-gray-500" : "text-gray-800"
              }`}
            >
              {module.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ModuleList;
