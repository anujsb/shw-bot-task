const express = require("express");
const router = express.Router();

const {
  getAllCannedMessages,
  createCannedMessage,
  useCannedMessage,
} = require("../controllers/cannedMessageController");

// Fetch All Canned Messages
router.get("/", getAllCannedMessages);

router.post("/", createCannedMessage);

router.post("/:id/reply", useCannedMessage);

module.exports = router;

// Need to be done :
// Get Dashboard Stats (GET /api/dashboard/stats) — To Provide metrics like unread, resolved, and urgent messages.
// Get Agent Workload (GET /api/dashboard/agents) — To Provide stats on each agent’s workload (active and resolved messages).
