const app = require("./app");
const connectDb = require("./config/db");
const { port, mongoUri } = require("./config/env");

async function start() {
  try {
    await connectDb(mongoUri);
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
}

start();
