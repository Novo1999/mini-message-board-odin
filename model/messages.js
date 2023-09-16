const { Schema, mongoose } = require("mongoose");
const formatDate = require("../helper/formatDate");

const MessageSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("messages", MessageSchema);
