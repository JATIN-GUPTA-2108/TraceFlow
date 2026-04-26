const Mapping = require("../../models/mapping.model");
const { applyMapping } = require("../../core/mapping-engine");

async function createMapping(req, res) {
  const mapping = await Mapping.create(req.body);
  res.status(201).json(mapping);
}

async function getMappings(_req, res) {
  const mappings = await Mapping.find().sort({ createdAt: -1 });
  res.json(mappings);
}

async function applyMappingPreview(req, res) {
  const { mappingId, input } = req.body;
  const mapping = await Mapping.findById(mappingId);

  if (!mapping) {
    return res.status(404).json({ error: "Mapping not found" });
  }

  const output = applyMapping(input || {}, mapping.mappings);
  return res.json({ output });
}

module.exports = {
  createMapping,
  getMappings,
  applyMappingPreview,
};
