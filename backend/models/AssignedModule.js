const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  traineeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  moduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Module' },
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model('AssignedModule', assignmentSchema);
