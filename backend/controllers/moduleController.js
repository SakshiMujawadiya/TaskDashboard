const Module = require("../models/Module");
const AssignedModule = require("../models/AssignedModule");

// Instructor: Create a new training module
const createModule = async (req, res) => {
  try {
    const { title, description } = req.body;
    const module = await Module.create({ title, description });
    res.status(201).json(module);
  } catch (err) {
    res.status(500).json({ message: "Error creating module", error: err.message });
  }
};

// Instructor: Assign an existing module to a trainee
const assignModule = async (req, res) => {
  try {
    const { traineeId, moduleId } = req.body;

    const alreadyAssigned = await AssignedModule.findOne({ traineeId, moduleId });
    if (alreadyAssigned) {
      return res.status(400).json({ message: "Module already assigned" });
    }

    await AssignedModule.create({ traineeId, moduleId, completed: false });
    res.json({ message: "Module assigned successfully" });
  } catch (err) {
    res.status(500).json({ message: "Assignment failed", error: err.message });
  }
};

// Instructor: Unassign an existing module to a trainee
const unassignModule = async (req, res) => {
  try {
    const id = req.params.id;
    await AssignedModule.findByIdAndDelete(id);
    res.json({ message: "Module unassigned successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to unassign module" });
  }
};

// Instructor: Update an existing module to a trainee
const updateModule = async (req, res) => {
  try {
    const { title, description } = req.body;
    const module = await Module.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true } 
    );
    res.json(module);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  } 
};

//  Trainee: Mark assigned module as completed
const markComplete = async (req, res) => {
  try {
    const id = req.params.id;
    await AssignedModule.findByIdAndUpdate(id, { completed: true });
    res.json({ message: "Marked as completed" });
  } catch (err) {
    res.status(500).json({ message: "Completion failed", error: err.message });
  }
};

// ✅ Trainee: Get all assigned modules (with populated module details)
const getAssignedModules = async (req, res) => {
  try {
    const modules = await AssignedModule.find({ traineeId: req.user.id }).populate("moduleId");

    const formatted = modules.map((item) => ({
      _id: item._id,
      title: item.moduleId.title,
      description: item.moduleId.description,
      completed: item.completed,
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch modules", error: err.message });
  }
};

module.exports = {
  createModule,
  assignModule,
  markComplete,
  getAssignedModules,
  unassignModule,
  updateModule,
}