const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    token: { type: String },
    metadata: { type: Object, default: {} },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Session", sessionSchema);
