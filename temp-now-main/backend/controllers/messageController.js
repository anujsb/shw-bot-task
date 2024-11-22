const Message = require("../models/messageModel");

exports.getAllMessages = async (req, res) => {
  try {
    const { status, priority, search } = req.query;
    const filters = {};
    if (status) filters.status = status;
    if (priority) filters.priority = priority;
    if (search) filters.messageBody = { $regex: search, $options: "i" };

    const messages = await Message.find(filters);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages", error });
  }
};

exports.getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ message: "Message not found" });

    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: "Error fetching message", error });
  }
};

// exports.addMessage = async (req, res) => {
//   try {
//     const {
//       "User ID": userId,
//       "Timestamp (UTC)": timestamp,
//       "Message Body": messageBody,
//       priority,
//       status,
//     } = req.body;

//     const message = new Message({
//       userId,
//       timestamp: new Date(timestamp), // Convert the string to a Date object
//       messageBody,
//       priority,
//       status,
//     });

//     await message.save();
//     res.status(201).json(message);
//   } catch (error) {
//     res.status(400).json({ message: "Error adding message", error });
//   }
// };

exports.addMessage = async (req, res) => {
  try {
    const {
      "User ID": userId,
      "Timestamp (UTC)": timestamp,
      "Message Body": messageBody,
      priority,
      status,
    } = req.body;

    // Check if the userId already exists in the messages collection
    let message = await Message.findOne({ userId });

    // If the userId exists, don't create a new message, but instead update the chatHistory
    if (message) {
      // You can set a default priority and status if needed here
      message.chatHistory.push({
        sender: "customer", // Default sender is customer
        messageBody,
        timestamp: new Date(),
      });

      // Save the updated message
      await message.save();
      return res.status(200).json({
        message: "Message added to existing conversation",
        updatedMessage: message,
      });
    }

    // If the userId does not exist, create a new message entry
    message = new Message({
      userId,
      timestamp: new Date(timestamp), // Convert the string to a Date object
      messageBody,
      priority,
      status,
    });

    // Save the new message
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ message: "Error adding message", error });
  }
};

exports.updateMessage = async (req, res) => {
  try {
    const updates = req.body;
    const message = await Message.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    if (!message) return res.status(404).json({ message: "Message not found" });

    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ message: "Error updating message", error });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) return res.status(404).json({ message: "Message not found" });

    res.status(200).json({ message: "Message deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting message", error });
  }
};

exports.addBulkMessages = async (req, res) => {
  try {
    // Directly use req.body as an array of messages
    const messages = req.body.map((msg) => ({
      userId: msg["User ID"],
      timestamp: new Date(msg["Timestamp (UTC)"]),
      messageBody: msg["Message Body"],
      priority: msg.priority || "normal",
    }));

    const savedMessages = await Message.insertMany(messages);
    res.status(201).json(savedMessages);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error adding bulk messages", error });
  }
};

exports.markAsResolved = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findById(id);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    message.status = "resolved";
    await message.save();

    res.status(200).json({
      message: "Message marked as resolved",
      updatedMessage: message,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error marking message as resolved", error });
  }
};

exports.markAsInProgress = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findById(id);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    message.status = "in-progress";
    await message.save();

    res.status(200).json({
      message: "Message marked as in-progress",
      updatedMessage: message,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error marking message as in-progress", error });
  }
};

exports.flagAsUrgent = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findById(id);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    message.priority = "urgent";
    await message.save();

    res.status(200).json({
      message: "Message marked as urgent",
      updatedMessage: message,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error flagging message as urgent", error });
  }
};

// chat starting from here :

exports.assignAgentToMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { agentName } = req.body;

    const message = await Message.findById(id);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    // Assigning the agent to the message
    message.agentName = agentName;

    // Initializing chatHistory if not already done
    if (!message.chatHistory) {
      message.chatHistory = [];
    }

    await message.save();
    res
      .status(200)
      .json({ message: "Agent assigned", updatedMessage: message });
  } catch (error) {
    res.status(500).json({ message: "Error assigning agent", error });
  }
};

// exports.sendMessageInChat = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { sender, messageBody } = req.body; // sender: "customer" or "agent", messageBody: text message

//     if (!["customer", "agent"].includes(sender)) {
//       return res
//         .status(400)
//         .json({ message: "Sender must be either 'customer' or 'agent'" });
//     }

//     const message = await Message.findById(id);

//     if (!message) {
//       return res.status(404).json({ message: "Message not found" });
//     }

//     message.chatHistory.push({
//       sender,
//       messageBody,
//       timestamp: new Date(),
//     });

//     await message.save();
//     res.status(200).json({ message: "Message sent", updatedMessage: message });
//   } catch (error) {
//     res.status(500).json({ message: "Error sending message", error });
//   }
// };

exports.sendMessageInChat = async (req, res) => {
  try {
    const { id } = req.params;
    const { sender, messageBody } = req.body; // sender: "customer" or "agent", messageBody: text message

    if (!["customer", "agent"].includes(sender)) {
      return res
        .status(400)
        .json({ message: "Sender must be either 'customer' or 'agent'" });
    }

    const message = await Message.findById(id);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    message.chatHistory.push({
      sender: sender || "customer", // Default sender is "customer" if not specified
      messageBody,
      timestamp: new Date(),
    });

    await message.save();
    res.status(200).json({ message: "Message sent", updatedMessage: message });
  } catch (error) {
    res.status(500).json({ message: "Error sending message", error });
  }
};

// Controller to filter messages by userId
exports.getMessagesByUserId = async (req, res) => {
  try {
    const { userId } = req.body; // Extract userId from the request body

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Fetch all messages with the given userId
    const messages = await Message.find({ userId });

    if (!messages.length) {
      return res
        .status(404)
        .json({ message: "No messages found for this User ID" });
    }

    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages", error });
  }
};
