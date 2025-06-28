const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const roleCheck = require("../middleware/roleMiddleware");
const {
  getAllTrainees,
  getAssignedModulesForTrainee,
  getInstructorInsights,
  getAllTraineesWithProgress,
} = require("../controllers/InstructorController");

//  Get all trainees
router.get("/trainees", auth, roleCheck("instructor"), getAllTrainees);

//  Get modules assigned to a trainee
router.get("/modules/:traineeId", auth, roleCheck("instructor"), getAssignedModulesForTrainee);

//  Get progress insights for all trainees
router.get("/insights", auth, roleCheck("instructor"), getInstructorInsights);

// Get trainees with total/completed module stats
router.get("/trainees/progress", auth, roleCheck("instructor"), getAllTraineesWithProgress);

module.exports = router;
