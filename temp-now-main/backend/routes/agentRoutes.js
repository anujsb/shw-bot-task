const express = require("express");
const router = express.Router();

const {
  getAllAgents,
  assignMessage,
  createAgent,
  deleteAgent,
  updateAgent,
  fetchAssignedMessages,
} = require("../controllers/agentController");

router.get("/", getAllAgents);

router.post("/assign", assignMessage);

router.post("/create-agent", createAgent);

router.post("/delete-agent", deleteAgent);

router.post("/update-agent", updateAgent);

router.get("/:agentId/messages", fetchAssignedMessages);

module.exports = router;
