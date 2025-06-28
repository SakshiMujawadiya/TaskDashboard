import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import EditModuleModal from "../../components/EditModuleModal";

const TraineeDetail = () => {
  const { id } = useParams();
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);

  const token = localStorage.getItem("token");

  const fetchModules = () => {
    axios
      .get(`http://localhost:5000/api/instruct/modules/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setModules(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch modules", err);
        setError("Failed to load modules.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchModules();
  }, [id]);

  const unassign = (moduleId) => {
    axios
      .delete(`http://localhost:5000/api/modules/unassign/${moduleId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setModules((prev) => prev.filter((m) => m._id !== moduleId));
      })
      .catch((err) => {
        console.error("Failed to unassign module", err);
        alert("Error unassigning module.");
      });
  };

  const handleEditClick = (module) => {
    setSelectedModule(module);
    setShowEditModal(true);
  };

  if (loading) return <p className="text-gray-600">Loading modules...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📘 Modules for Trainee</h1>
      {modules.length === 0 ? (
        <p className="text-gray-500">No modules assigned.</p>
      ) : (
        modules.map((module) => (
          <div
            key={module._id}
            className="p-4 border border-gray-200 rounded shadow-sm mb-3 bg-white"
          >
            <h2 className="text-lg font-semibold text-gray-700">
              {module.title}
            </h2>
            <p className="text-gray-600 text-sm">{module.description}</p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => handleEditClick(module)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => unassign(module._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                Unassign
              </button>
            </div>
          </div>
        ))
      )}

      {showEditModal && selectedModule && (
  <EditModuleModal
    key={selectedModule._id} 
    module={selectedModule}
    onClose={() => setShowEditModal(false)}
    onUpdated={() => {
      fetchModules();                 
      setShowEditModal(false);       
    }}
  />
)}

    
    </div>
  );
};

export default TraineeDetail;
