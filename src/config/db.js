const mongoose = require("mongoose");

async function connectDb(mongoUri) {
  await mongoose.connect(mongoUri);
  console.log("Mongo Connected");
}

module.exports = connectDb;
