// const mongoose = require("mongoose");

// const messageSchema = new mongoose.Schema({
//   userId: { type: String, required: true },
//   agentName: { type: String, required: false }, // Agent assigned to the message
//   timestamp: { type: Date, required: true },
//   messageBody: { type: String, required: true },
//   priority: {
//     type: String,
//     enum: ["urgent", "high", "normal"],
//     default: "normal",
//     required: false,
//   },
//   status: {
//     type: String,
//     enum: ["unread", "in-progress", "resolved"],
//     default: "unread",
//     required: false,
//   },
//   chatHistory: [
//     {
//       sender: { type: String, enum: ["customer", "agent"], required: true }, // Who sent the message
//       messageBody: { type: String, required: true }, // The message content
//       timestamp: { type: Date, default: Date.now }, // When the message was sent
//     },
//   ], // Tracks all messages between customer and agent
// });

// module.exports = mongoose.model("Message", messageSchema);

const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  agentName: { type: String, required: false }, // Agent assigned to the message
  timestamp: { type: Date, required: true },
  messageBody: { type: String, required: true },
  priority: {
    type: String,
    enum: ["urgent", "high", "normal"],
    default: "normal",
    required: false,
  },
  status: {
    type: String,
    enum: ["unread", "in-progress", "resolved"],
    default: "unread",
    required: false,
  },
  chatHistory: [
    {
      sender: { type: String, enum: ["customer", "agent"], required: true }, // Who sent the message
      messageBody: { type: String, required: true }, // The message content
      timestamp: { type: Date, default: Date.now }, // When the message was sent
    },
  ], // Tracks all messages between customer and agent
});

// Middleware to check for specific words and set priority to "urgent"
messageSchema.pre("save", function (next) {
  const keywords = ["loan", "disbursed"];

  // Check if the messageBody contains keywords
  const containsKeyword = keywords.some((word) =>
    this.messageBody.toLowerCase().includes(word)
  );

  // Check if any chatHistory messageBody contains keywords
  const chatContainsKeyword =
    this.chatHistory &&
    this.chatHistory.some((chat) =>
      keywords.some((word) => chat.messageBody.toLowerCase().includes(word))
    );

  if (containsKeyword || chatContainsKeyword) {
    this.priority = "urgent"; // Set priority to urgent
  }

  next();
});

module.exports = mongoose.model("Message", messageSchema);
