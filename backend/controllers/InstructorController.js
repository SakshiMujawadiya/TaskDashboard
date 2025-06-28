const User = require("../models/User");
const AssignedModule = require("../models/AssignedModule");
const Module = require("../models/Module");

// Get all trainees
const getAllTrainees = async (req, res) => {
  try {
    const trainees = await User.find({ role: "trainee" });
    res.json(trainees);
  } catch (err) {
    console.error("Error fetching trainees:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get assigned modules for a specific trainee
const getAssignedModulesForTrainee = async (req, res) => {
  try {
    const traineeId = req.params.traineeId;

    const assigned = await AssignedModule.find({ traineeId }).populate("moduleId");

    const formatted = assigned.map((m) => ({
      _id: m.moduleId?._id,
      title: m.moduleId?.title || "Untitled",
      description: m.moduleId?.description || "",
      completed: m.completed,
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Error fetching modules:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get insights for all assigned modules
const getInstructorInsights = async (req, res) => {
  try {
    const assignedModules = await AssignedModule.find().populate("traineeId");

    let completed = 0;
    let pending = 0;

    const traineeProgressMap = {};

    for (const assign of assignedModules) {
      const traineeId = assign.traineeId._id.toString();
      const name = assign.traineeId.username || assign.traineeId.name;

      if (!traineeProgressMap[traineeId]) {
        traineeProgressMap[traineeId] = {
          trainee: name,
          completedModules: 0,
          pendingModules: 0,
        };
      }

      if (assign.completed) {
        traineeProgressMap[traineeId].completedModules += 1;
        completed += 1;
      } else {
        traineeProgressMap[traineeId].pendingModules += 1;
        pending += 1;
      }
    }

    const progress = Object.values(traineeProgressMap);

    res.json({
      stats: {
        total: completed + pending, // ✅ updated here
        completed,
        pending,
      },
      progress,
    });
  } catch (err) {
    console.error("Error in insights route:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// Get all trainees with progress stats

const getAllTraineesWithProgress = async (req, res) => {
  try {
    const trainees = await User.find({ role: "trainee" });

    const result = await Promise.all(
      trainees.map(async (trainee) => {
        const assignments = await AssignedModule.find({ traineeId: trainee._id });
        const completed = assignments.filter((a) => a.completed).length;
        const total = assignments.length;
        const pending = total - completed;
        const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

        return {
          _id: trainee._id,
          name: trainee.name, // ✅ this must be updated
          completed,
          total,
          pending,
          progress,
        };
      })
    );

    res.json(result);
  } catch (err) {
    console.error("Error fetching trainee progress:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllTrainees,
  getAssignedModulesForTrainee,
  getInstructorInsights,
  getAllTraineesWithProgress,
};
