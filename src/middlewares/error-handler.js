function notFound(_req, res) {
  res.status(404).json({ error: "Route not found" });
}

function errorHandler(err, _req, res, _next) {
  console.error(err);

  const statusCode = res.statusCode >= 400 ? res.statusCode : 500;
  res.status(statusCode).json({
    error: err.message || "Internal Server Error",
  });
}

module.exports = {
  notFound,
  errorHandler,
};
