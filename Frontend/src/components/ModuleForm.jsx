import React, { useState } from "react";
import axios from "axios";

const ModuleForm = ({ traineeId, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return;

    try {
      const token = localStorage.getItem("token");

      
      const createRes = await axios.post(
        "http://localhost:5000/api/modules",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const moduleId = createRes.data._id;

      await axios.post(
        "http://localhost:5000/api/modules/assign",
        {
          traineeId,
          moduleId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setDescription("");
      onSuccess(); 
    } catch (err) {
      console.error("Error creating/assigning module:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mt-4">
      <input
        type="text"
        placeholder="Module Title"
        className="border rounded px-3 py-2 w-full text-sm"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Module Description"
        className="border rounded px-3 py-2 w-full text-sm"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 text-sm rounded hover:bg-indigo-700"
      >
        Add Module
      </button>
    </form>
  );
};

export default ModuleForm;
