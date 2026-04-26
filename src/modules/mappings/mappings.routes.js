const express = require("express");
const asyncHandler = require("../../middlewares/async-handler");
const { createMapping, getMappings, applyMappingPreview } = require("./mappings.controller");

const router = express.Router();

router.post("/", asyncHandler(createMapping));
router.get("/", asyncHandler(getMappings));
router.post("/apply", asyncHandler(applyMappingPreview));

module.exports = router;
