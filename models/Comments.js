const mongoose = require("mongoose");

const CommentsSchema = mongoose.Schema({
  article: { type: mongoose.Schema.Types.ObjectId, ref: "articles" },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("comments", CommentsSchema);
