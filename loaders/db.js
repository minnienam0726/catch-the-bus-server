const mongoose = require("mongoose");

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

    console.info("Connected to database...");
  } catch (err) {
    console.error("connection error");
  }
};

module.exports = db;
