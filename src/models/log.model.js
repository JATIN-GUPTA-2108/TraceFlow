const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
    sessionId: { type: mongoose.Schema.Types.ObjectId, ref: "Session", required: true, index: true },
    request: {
      url: { type: String, required: true },
      method: { type: String, required: true },
      headers: { type: Object, default: {} },
      body: { type: Object, default: {} },
    },
    response: {
      status: { type: Number, default: 0 },
      body: { type: Object, default: {} },
    },
    mappedOutput: { type: Object, default: null },
    execution: {
      status: { type: String, default: "MANUAL" },
      duration: { type: Number, default: 0 },
      error: { type: String, default: null },
    },
  },
  { timestamps: true }
);

logSchema.index({ sessionId: 1, createdAt: -1 });

module.exports = mongoose.model("Log", logSchema);
