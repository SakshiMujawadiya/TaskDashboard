import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AccountSetting = () => {
  const [newname, setNewname] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const updateUsername = async () => {
    try {
      const res = await axios.patch(
        "http://localhost:5000/api/auth/update-username",
        { newname },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMsg(res.data.message);

      setTimeout(() => navigate("/"), 1000); 
    } catch (err) {
      setMsg(err.response?.data?.message || "Username update failed");
    }
  };

  const updatePassword = async () => {
    console.log("Sending:", currentPassword, newPassword);
    try {
      const res = await axios.patch(
        "http://localhost:5000/api/auth/update-password",
        {
          oldPassword: currentPassword,
          newPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMsg(res.data.message);
 localStorage.setItem(
      "fleet_user",
      JSON.stringify({ ...oldUserData, name: updatedUser.name })
    ); 
setTimeout(() => {
  window.location.reload(); // Refresh UI to reflect new name
}, 1000);


      setTimeout(() => navigate("/"), 1000); 
    } catch (err) {
      console.error("Password update failed:", err.response?.data || err.message);
      setMsg(err.response?.data?.message || "Password update failed");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow space-y-4">
      <h2 className="text-xl font-semibold">Update Username</h2>
      <input
        type="text"
        placeholder="New username"
        value={newname}
        onChange={(e) => setNewname(e.target.value)}
        className="border p-2 w-full"
      />
      <button
        onClick={updateUsername}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Update Username
      </button>

      <h2 className="text-xl font-semibold mt-6">Update Password</h2>
      <input
        type="password"
        placeholder="Current password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        type="password"
        placeholder="New password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="border p-2 w-full mt-2"
      />
      <button
        onClick={updatePassword}
        className="bg-green-600 text-white px-4 py-2 rounded mt-2"
      >
        Update Password
      </button>

      {msg && <p className="text-center text-sm text-gray-700 mt-4">{msg}</p>}
    </div>
  );
};

export default AccountSetting;
