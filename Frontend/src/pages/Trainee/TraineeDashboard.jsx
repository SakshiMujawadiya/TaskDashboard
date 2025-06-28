import { useEffect, useState } from "react";
import axios from "axios";

import GreetingBox from "../Trainee/GreetingBox";
import ProgressBar from "../../components/ProgressBar";
import StatsCards from "../Trainee/StatsCard";
import MotivationalQuote from "../Trainee/MotivationalQuote";
import ModuleList from "../../components/ModuleList"; 
import ProgressChart from "../../components/ProgressChart";

const TraineeDashboard = () => {
  const [modules, setModules] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
   const [showProfileChart, setShowProfileChart] = useState(false)

  const fetchModules = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/modules", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setModules(res.data);
      setUser({ name: "Trainee" }); 
      setLoading(false);
    } catch (err) {
      console.error("❌ Error fetching trainee data:", err.message);
      setLoading(false);
    }
  };

  const markCompleted = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:5000/api/modules/complete/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchModules();
    } catch (err) {
      console.error(" Error marking as complete:", err.message);
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  const completed = modules.filter((m) => m.completed).length;
  const pending = modules.length - completed;

  


  return (
    <div className="p-6 bg-gray-50 min-h-screen">
     <GreetingBox name={user.name} onViewProfile={() => setShowProfileChart(!showProfileChart)} />
      {showProfileChart && (
  <ProgressChart completedCount={completed} pendingCount={pending} />
)}
      <StatsCards total={modules.length} completed={completed} pending={pending} />
      <ProgressBar completed={completed} total={modules.length} />
      <MotivationalQuote />
      <ModuleList modules={modules} toggleModule={markCompleted} /> 
    </div>
  );
};

export default TraineeDashboard;
