const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
  agentName: { type: String, required: true },
  activeMessages: { type: Number, default: 0 },
  assignedMessages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
});

module.exports = mongoose.model("Agent", agentSchema);
