const Agent = require("../models/agentModel");
const Message = require("../models/messageModel");

// 2.1 Get All Agents
exports.getAllAgents = async (req, res) => {
  try {
    const agents = await Agent.find();
    res.status(200).json(agents);
  } catch (error) {
    res.status(500).json({ message: "Error fetching agents", error });
  }
};

exports.assignMessage = async (req, res) => {
  try {
    const { agentName, messageId } = req.body;

    // Find the agent
    const agent = await Agent.findOne({ agentName });
    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }

    // Find the message
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    // Add the message ID to the agent's assignedMessages
    if (!agent.assignedMessages.includes(messageId)) {
      agent.assignedMessages.push(messageId);
      agent.activeMessages += 1; // Increment active messages count
      await agent.save();
    }

    // Update the message to include the assigned agent's name
    message.assignedAgent = agentName;
    await message.save();

    res.status(200).json({
      message: "Message assigned successfully",
      agent,
      updatedMessage: message,
    });
  } catch (error) {
    res.status(500).json({ message: "Error assigning message", error });
  }
};

exports.createAgent = async (req, res) => {
  try {
    const { agentName, activeMessages = 0 } = req.body;

    const agent = new Agent({ agentName, activeMessages });
    const savedAgent = await agent.save();

    res.status(201).json(savedAgent);
  } catch (error) {
    res.status(500).json({ message: "Error creating agent", error });
  }
};

exports.deleteAgent = async (req, res) => {
  try {
    const { agentName } = req.body;

    const agent = await Agent.findOneAndDelete({ agentName });
    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }

    res.status(200).json({ message: "Agent deleted successfully", agent });
  } catch (error) {
    res.status(500).json({ message: "Error deleting agent", error });
  }
};

exports.updateAgent = async (req, res) => {
  try {
    const { agentName, activeMessages } = req.body;

    const agent = await Agent.findOne({ agentName });
    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }

    if (activeMessages !== undefined) agent.activeMessages = activeMessages;

    const updatedAgent = await agent.save();
    res.status(200).json(updatedAgent);
  } catch (error) {
    res.status(500).json({ message: "Error updating agent", error });
  }
};

exports.fetchAssignedMessages = async (req, res) => {
  try {
    const { agentId } = req.params;

    const agent = await Agent.findById(agentId).populate("assignedMessages");
    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }

    res.status(200).json(agent.assignedMessages);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching assigned messages", error });
  }
};
