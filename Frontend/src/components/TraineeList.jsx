import React, { useState, useEffect } from "react";
import axios from "axios";
import ProgressBar from "./ProgressBar";
import EditModuleModal from "./EditModuleModal";

const TraineeList = ({ trainee }) => {
  const [modules, setModules] = useState([]);
  const [editingModule, setEditingModule] = useState(null);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:5000/api/instruct/modules/${trainee._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setModules(res.data);
      } catch (err) {
        console.error("Error loading modules:", err.message);
      }
    };

    fetchModules();
  }, [trainee._id]);

  const handleUnassign = async (assignedId) => {
    const confirmDelete = window.confirm("Are you sure to unassign this module?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:5000/api/modules/unassign/${assignedId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setModules((prev) => prev.filter((m) => m._id !== assignedId));
    } catch (err) {
      console.error("Failed to unassign module:", err.message);
    }
  };

  const completed = modules.filter((m) => m.completed).length;

  return (
    <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition">
      <h3 className="text-lg font-semibold text-gray-800 mb-1">
        {trainee.name} ({trainee.email})
      </h3>

      <p className="text-sm text-gray-500 mb-2">
        Modules: {modules.length}
      </p>

      <ProgressBar completed={completed} total={modules.length || 1} />

      <ul className="mt-4 space-y-2 text-sm text-gray-700">
        {modules.map((mod) => (
          <li
            key={mod._id}
            className="flex justify-between items-center border-b pb-1"
          >
            <span>
              • {mod.title} {mod.completed ? "✅" : "❌"}
            </span>
            <div className="flex gap-3">
              <button
                onClick={() => setEditingModule(mod)}
                className="text-xs text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleUnassign(mod._id)}
                className="text-xs text-red-500 hover:underline"
              >
                Unassign
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal */}
      {editingModule && (
        <EditModuleModal
          module={editingModule}
          onClose={() => setEditingModule(null)}
          onUpdated={() => {
            setEditingModule(null);
            // Re-fetch after update
            const fetchModules = async () => {
              const token = localStorage.getItem("token");
              const res = await axios.get(
                `http://localhost:5000/api/instruct/modules/${trainee._id}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              setModules(res.data);
            };
            fetchModules();
          }}
        />
      )}
    </div>
  );
};
export default TraineeList;