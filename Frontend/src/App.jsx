import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import TraineeDashboard from "./pages/Trainee/TraineeDashboard";
import InstructorDashboard from "./pages/Instructor/InstructorDashboard";
import PrivateRoute from "./components/PrivateRoute";

import Navbar from "./components/Navbar";
import AccountSettings from "./components/AccountSettings";

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/trainee/dashboard" element={
          <PrivateRoute role="trainee"><TraineeDashboard /></PrivateRoute>
        } />
        <Route path="/instructor/*" element={
  <PrivateRoute role="instructor">
    <InstructorDashboard />
  </PrivateRoute>
} />
        
      <Route path="/account-settings" element={<AccountSettings />} />
        </Routes>
      
    </BrowserRouter>
  );
}

export default App;
