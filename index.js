const { createServer } = require('./server');
const { dbConnect } = require('./db/connection');
const {
  setConfigLatestLoLVersionJob,
} = require('./jobs/setConfigLatestLoLVersion.job');

require('dotenv').config();

const startServer = async () => {
  const db = await dbConnect();
  console.log('Connected to the database');

  const app = await createServer();

  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  // start jobs
  setConfigLatestLoLVersionJob();
};

startServer();
