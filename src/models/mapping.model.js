const mongoose = require("mongoose");

const mappingRuleSchema = new mongoose.Schema(
  {
    sourcePath: { type: String, required: true },
    targetPath: { type: String, required: true },
    transform: { type: String },
  },
  { _id: false }
);

const mappingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    mappings: { type: [mappingRuleSchema], default: [] },
    version: { type: Number, default: 1 },
    isReusable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Mapping", mappingSchema);
