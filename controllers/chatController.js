const Message = require('../models/Message');

const sendMessage = async (req, res) => {
  const { sender, receiver, text } = req.body;
  try {
    const message = await Message.create({ sender, receiver, text });
    res.status(201).json(message);
  } catch(e) {
    res.status(500).json({ message: 'Error sending message', e });
  }
};

const getMessages = async (req, res) => {
  const { user1, user2 } = req.query;
  try {
    const messages = await Message.find({
      $or: [
        { sender: user1, receiver: user2 },
        { sender: user2, receiver: user1 }
      ]
    }).sort({ createdAt: 1 });
    res.json(messages);
  } catch(e) {
    res.status(500).json({ message: 'Error fetching messages', e });
  }
};

module.exports = { sendMessage, getMessages };
