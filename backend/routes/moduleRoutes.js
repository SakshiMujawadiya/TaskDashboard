const express = require("express");
const {
  createModule,
  assignModule,
  markComplete,
  getAssignedModules,
  unassignModule,
  updateModule,
} = require("../controllers/moduleController");
const auth = require("../middleware/authMiddleware");
const roleCheck = require("../middleware/roleMiddleware");

const router = express.Router();

// Instructor: Create a new module
router.post("/", auth, roleCheck("instructor"), createModule);

//  Instructor: Assign an existing module to a trainee
router.post("/assign", auth, roleCheck("instructor"), assignModule);

// Instructor: Unassign an existing module to a trainee
router.delete( "/unassign/:id", auth, roleCheck("instructor"),unassignModule);

// Instructor: Update an existing module to a trainee
  router.patch("/:id", auth, roleCheck("instructor"), updateModule);

// Trainee: Mark assigned module as complete
router.patch("/complete/:id", auth, roleCheck("trainee"), markComplete);

// Trainee: Get all assigned modules (for dashboard)
router.get("/", auth, roleCheck("trainee"), getAssignedModules);

module.exports = router