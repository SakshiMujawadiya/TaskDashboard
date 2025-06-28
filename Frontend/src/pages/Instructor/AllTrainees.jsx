import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../../components/ProgressBar";

const AllTrainees = () => {
  const [trainees, setTrainees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/api/instruct/trainees/progress", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTrainees(res.data);
      } catch (err) {
        console.error("❌ Error fetching trainees", err);
        setError("Failed to load trainee data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="p-6">Loading trainees...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📋 All Trainees</h1>

      {trainees.length === 0 ? (
        <p className="text-gray-500">No trainees found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {trainees.map((trainee) => (
            <div
              key={trainee._id}
              className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition duration-200 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-700 break-words">
                  👤 {trainee.name}
                </h2>

                <ProgressBar completed={trainee.completed} total={trainee.total} />

                <p className="text-sm text-gray-500">✅ Completed: {trainee.completed}</p>
                <p className="text-sm text-gray-500">📦 Total Modules: {trainee.total}</p>
                <p className="text-sm text-gray-500">⏳ Pending: {trainee.pending}</p>
                <p className="text-sm text-gray-500">📈 Progress: {trainee.progress}%</p>
              </div>

              <button
                onClick={() => navigate(`/instructor/trainee/${trainee._id}`)}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium w-full"
              >
                View Modules →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllTrainees;

