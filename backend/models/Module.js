const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
   
});

module.exports = mongoose.model("Module", moduleSchema);
