const Message = require("../models/messageModel");

exports.getAllCannedMessages = async (req, res) => {
  try {
    const cannedMessages = await CannedMessage.find();
    res.status(200).json(cannedMessages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching canned messages", error });
  }
};

exports.createCannedMessage = async (req, res) => {
  try {
    const { title, content } = req.body;

    const newCannedMessage = new CannedMessage({
      title,
      content,
    });

    await newCannedMessage.save();
    res
      .status(201)
      .json({ message: "Canned message created", newCannedMessage });
  } catch (error) {
    res.status(500).json({ message: "Error creating canned message", error });
  }
};

exports.useCannedMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { cannedMessageId } = req.body;

    const message = await Message.findById(id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    const cannedMessage = await CannedMessage.findById(cannedMessageId);
    if (!cannedMessage) {
      return res.status(404).json({ message: "Canned message not found" });
    }

    message.body = cannedMessage.content; // Reply with the canned message
    await message.save();

    res.status(200).json({
      message: "Canned message used",
      updatedMessage: message,
    });
  } catch (error) {
    res.status(500).json({ message: "Error using canned message", error });
  }
};
