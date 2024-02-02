const { createServer } = require('./server');
const { dbConnect } = require('./db/connection');

require('dotenv').config();

const start = async () => {
  const db = await dbConnect();
  console.log('Connected to the database');

  const app = await createServer();

  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

start();
