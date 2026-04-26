const axios = require("axios");
const Log = require("../../models/log.model");
const Mapping = require("../../models/mapping.model");
const { applyMapping } = require("../../core/mapping-engine");

async function createManualLog(req, res) {
  const { sessionId, request, response, mappingId } = req.body;

  let mappedOutput = null;

  if (mappingId) {
    const mapping = await Mapping.findById(mappingId);
    if (!mapping) {
      return res.status(404).json({ error: "Mapping not found" });
    }

    mappedOutput = applyMapping(response?.body || {}, mapping.mappings);
  }

  const log = await Log.create({
    sessionId,
    request,
    response,
    mappedOutput,
    execution: { status: "MANUAL" },
  });

  return res.status(201).json(log);
}

async function getLogs(req, res) {
  const { sessionId } = req.query;

  const query = sessionId ? { sessionId } : {};
  const logs = await Log.find(query).sort({ createdAt: -1 }).limit(50);

  return res.json(logs);
}

async function getLogById(req, res) {
  const log = await Log.findById(req.params.id);

  if (!log) {
    return res.status(404).json({ error: "Log not found" });
  }

  return res.json(log);
}

async function replayLog(req, res) {
  const log = await Log.findById(req.params.id);

  if (!log) {
    return res.status(404).json({ error: "Log not found" });
  }

  const start = Date.now();

  try {
    const response = await axios({
      method: log.request.method,
      url: log.request.url,
      headers: log.request.headers,
      data: log.request.body,
    });

    const replayedLog = await Log.create({
      sessionId: log.sessionId,
      request: log.request,
      response: {
        status: response.status,
        body: response.data,
      },
      execution: {
        status: "SUCCESS",
        duration: Date.now() - start,
      },
    });

    return res.status(201).json(replayedLog);
  } catch (error) {
    const replayedLog = await Log.create({
      sessionId: log.sessionId,
      request: log.request,
      response: {
        status: error.response?.status || 500,
        body: error.response?.data || {},
      },
      execution: {
        status: "FAILED",
        duration: Date.now() - start,
        error: error.message,
      },
    });

    return res.status(500).json({ error: error.message, log: replayedLog });
  }
}

module.exports = {
  createManualLog,
  getLogs,
  getLogById,
  replayLog,
};
