const Message = require('../models/Message');

const sendMessage = async (req, res) => {
  const { senderId, sender, equipmentId, message, timestamp } = req.body;
  try {
    const newMessage = await Message.create({ senderId, sender, equipmentId, message, timestamp });
    res.status(201).json(newMessage);
  } catch(e) {
    res.status(500).json({ message: 'Error sending message', e });
  }
};

const getMessages = async (req, res) => {
  const { equipmentId } = req.query;
  try {
    const messages = await Message.find({
      equipmentId
    }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (e) {
    res.status(500).json({ message: 'Error fetching messages', e });
  }
};

module.exports = { sendMessage, getMessages };
