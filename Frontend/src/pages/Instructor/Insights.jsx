import { useEffect, useState } from "react";
import axios from "axios";
import TraineeBarChart from "../../components/TraineeBarChart";

const Insights = () => {
  const [data, setData] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/instruct/insights", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        
        const formattedData = res.data.progress.map((item) => ({
          name: item.trainee, 
          completed: item.completedModules,
          pending: item.pendingModules,
        }));

        setData(formattedData);
        setStats(res.data.stats);
      })
      .catch((err) => {
        console.error("Failed to load insights", err);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📈 Training Insights</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-100 p-5 rounded shadow text-center">
          <p className="text-xl font-bold">{stats.total}</p>
          <p className="text-gray-700">Total Modules</p>
        </div>
        <div className="bg-green-100 p-5 rounded shadow text-center">
          <p className="text-xl font-bold">{stats.completed}</p>
          <p className="text-gray-700">Completed</p>
        </div>
        <div className="bg-red-100 p-5 rounded shadow text-center">
          <p className="text-xl font-bold">{stats.pending}</p>
          <p className="text-gray-700">Pending</p>
        </div>
      </div>

      <TraineeBarChart data={data} />
    </div>
  );
};

export default Insights;
