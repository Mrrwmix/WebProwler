const mongoose = require("mongoose");
let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraping";

const connectDB = async () => {
  try {
    mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
    console.log("MongoDB connected!");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
