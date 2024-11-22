const express = require("express");
const {
  getAllMessages,
  getMessageById,
  addMessage,
  updateMessage,
  deleteMessage,
  addBulkMessages,
  markAsResolved,
  markAsInProgress,
  flagAsUrgent,
  assignAgentToMessage,
  sendMessageInChat,
  getMessagesByUserId,
} = require("../controllers/messageController");

const router = express.Router();

router.get("/messages", getAllMessages);
router.get("/messages/:id", getMessageById);
router.post("/messages", addMessage);
router.patch("/messages/:id", updateMessage);
router.delete("/messages/:id", deleteMessage);
router.post("/add-bulk-messages", addBulkMessages);
router.post("/:id/resolve", markAsResolved);
router.patch("/:id/start", markAsInProgress);
router.patch("/:id/flag-urgent", flagAsUrgent);

//  for assigning an agent to a message
router.post("/:id/assign-agent", assignAgentToMessage);

//  for sending messages in the chat
router.post("/:id/chat", sendMessageInChat);

// router.get("/messages/user/:userId", getMessagesByUserId);
router.post("/messages/user", getMessagesByUserId);


module.exports = router;
