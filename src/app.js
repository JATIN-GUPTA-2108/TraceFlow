const express = require("express");
const sessionsRoutes = require("./modules/sessions/sessions.routes");
const mappingsRoutes = require("./modules/mappings/mappings.routes");
const logsRoutes = require("./modules/logs/logs.routes");
const { notFound, errorHandler } = require("./middlewares/error-handler");

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/sessions", sessionsRoutes);
app.use("/mappings", mappingsRoutes);
app.use("/logs", logsRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
