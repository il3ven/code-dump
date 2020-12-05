const mongoose = require("mongoose");

const paste = new mongoose.Schema({
  content: String,
  createdAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("paste", paste);
