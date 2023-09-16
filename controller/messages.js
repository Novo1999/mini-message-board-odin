const asyncWrapper = require("../middleware/async");
const messages = require("../model/messages");

const getMessages = asyncWrapper(async (req, res) => {
  const allMessages = await messages.find({});
  if (!messages) {
    return res.status(404).json({ msg: "Couldn't get messages" });
  }
  return res.status(201).json({ allMessages });
});

const newMessage = asyncWrapper(async (req, res) => {
  const message = await messages.create(req.body);
  console.log(req.body);
  if (!messages) {
    return res.status(404).json({ msg: "No name or message" });
  }
  return res.status(201).json({ message });
});

module.exports = { getMessages, newMessage };
