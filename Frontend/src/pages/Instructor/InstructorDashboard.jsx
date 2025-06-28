import { Routes, Route, useLocation } from "react-router-dom";
import AllTrainees from "../Instructor/AllTrainees";
import TraineeDetail from "../Instructor/TraineeDetail";
import AddModule from "../Instructor/AddModule";
import Insights from "../Instructor/Insights";
import Sidebar from "../../components/Sidebar";

const InstructorDashboard = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md border-r">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">
       
        {location.pathname === "/instructor/dashboard" && (
          <div className="text-center mt-16">
            <h1 className="text-3xl font-bold text-blue-700 mb-2">👋 Welcome Instructor!</h1>
            <p className="text-gray-600 text-lg">
              Select a menu item from the sidebar to get started.
            </p>
          </div>
        )}

        {/* Routes render only when path matches */}
        <Routes>
          <Route path="trainees" element={<AllTrainees />} />
          <Route path="trainee/:id" element={<TraineeDetail />} />
          <Route path="module/new" element={<AddModule />} />
          <Route path="insights" element={<Insights />} />
        </Routes>
      </div>
    </div>
  );
};

export default InstructorDashboard;
