import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EditModuleModal = ({ module, onClose, onUpdated }) => {
  const [title, setTitle] = useState(module.title);
  const [description, setDescription] = useState(module.description);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        `http://localhost:5000/api/modules/${module._id}`,
        { title, description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Module updated successfully");
      onUpdated();  
      onClose();    
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update module");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h3 className="text-xl font-semibold mb-4">Edit Module</h3>
        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Module Title"
            className="w-full border px-3 py-2 rounded"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Module Description"
            className="w-full border px-3 py-2 rounded"
          ></textarea>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModuleModal;
