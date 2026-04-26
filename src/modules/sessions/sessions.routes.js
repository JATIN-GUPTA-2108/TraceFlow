const express = require("express");
const asyncHandler = require("../../middlewares/async-handler");
const { createSession, getSessions } = require("./sessions.controller");

const router = express.Router();

router.post("/", asyncHandler(createSession));
router.get("/", asyncHandler(getSessions));

module.exports = router;
