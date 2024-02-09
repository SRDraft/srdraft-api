const { createServer } = require('./server');
const { dbConnect } = require('./db/connection');
const {
  updateChampionsBasedOnVersionJob,
} = require('./jobs/updateChampionsBasedOnVersion.job');

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
  updateChampionsBasedOnVersionJob();
};

startServer();
