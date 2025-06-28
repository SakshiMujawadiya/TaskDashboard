const express = require("express");
const {
  register,
  login,
  updatePassword,
  updateUsername,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware"); // ✅ import it

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.patch("/update-password", authMiddleware, updatePassword); // ✅ protected
router.patch("/update-username", authMiddleware, updateUsername); // ✅ protected

module.exports = router;
