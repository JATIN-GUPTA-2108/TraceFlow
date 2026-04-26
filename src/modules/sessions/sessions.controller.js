const Session = require("../../models/session.model");

async function createSession(req, res) {
  const session = await Session.create(req.body);
  res.status(201).json(session);
}

async function getSessions(_req, res) {
  const sessions = await Session.find().sort({ createdAt: -1 });
  res.json(sessions);
}

module.exports = {
  createSession,
  getSessions,
};
