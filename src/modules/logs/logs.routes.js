const express = require("express");
const asyncHandler = require("../../middlewares/async-handler");
const { createManualLog, getLogs, getLogById, replayLog } = require("./logs.controller");

const router = express.Router();

router.post("/manual", asyncHandler(createManualLog));
router.get("/", asyncHandler(getLogs));
router.get("/:id", asyncHandler(getLogById));
router.post("/replay/:id", asyncHandler(replayLog));

module.exports = router;
