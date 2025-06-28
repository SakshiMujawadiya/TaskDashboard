const express = require("express");
const router = express.Router();
const AssignedModule = require("../models/AssignedModule");
const auth = require("../middleware/authMiddleware");
const roleCheck = require("../middleware/roleMiddleware");

// Get assigned modules for logged-in trainee
router.get("/modules", auth, roleCheck("trainee"), async (req, res) => {
  try {
    const modules = await AssignedModule.find({ traineeId: req.user.id }).populate("moduleId");
    res.json(modules);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch modules" });
  }
});

module.exports = router;
