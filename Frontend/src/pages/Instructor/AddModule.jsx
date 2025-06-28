import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddModule = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [trainees, setTrainees] = useState([]);
  const [selectedTrainees, setSelectedTrainees] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/instruct/trainees", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTrainees(res.data))
      .catch(() => toast.error("Failed to load trainees"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/modules",
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const moduleId = res.data._id;

      if (selectedTrainees.length > 0) {
        await Promise.all(
          selectedTrainees.map((traineeId) =>
            axios.post(
              "http://localhost:5000/api/modules/assign",
              { moduleId, traineeId },
              { headers: { Authorization: `Bearer ${token}` } }
            )
          )
        );
      }

      toast.success(" Module created and assigned!");
      setTitle("");
      setDescription("");
      setSelectedTrainees([]);
    } catch (err) {
      console.error(err);
      toast.error(" Error creating or assigning module");
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedTrainees((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        📘 Create New Module
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-xl shadow-lg border border-gray-200"
      >
        <div>
          <label className="block mb-1 font-medium text-gray-700">Module Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. React Basics"
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief module description..."
            rows={4}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>

        <div>
          <p className="font-medium text-gray-700 mb-2">Assign to Trainees:</p>
          <div className="max-h-48 overflow-y-auto border border-gray-300 p-3 rounded-lg bg-gray-50">
            {trainees.length === 0 ? (
              <p className="text-sm text-gray-500">No trainees found.</p>
            ) : (
              trainees.map((trainee) => (
                <label key={trainee._id} className="block text-sm text-gray-800 mb-2">
                  <input
                    type="checkbox"
                    value={trainee._id}
                    checked={selectedTrainees.includes(trainee._id)}
                    onChange={() => handleCheckboxChange(trainee._id)}
                    className="mr-2 accent-blue-600"
                  />
                  {trainee.name}
                </label>
              ))
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          ➕ Add & Assign Module
        </button>
      </form>
    </div>
  );
};

export default AddModule;
