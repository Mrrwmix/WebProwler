const mongoose = require("mongoose");

const ArticlesSchema = mongoose.Schema({
  headline: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  blurb: { type: String, required: true },
  url: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("articles", ArticlesSchema);
