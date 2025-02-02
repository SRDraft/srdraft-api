const express = require('express');
const cors = require('cors');

const createServer = async () => {
  // init express
  const app = express();

  // middleware
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  app.use(cors());

  app.get('/', (req, res) => {
    res.send('Hello World!!');
  });

  // routes
  app.use('/auth', require('./routes/auth.routes'));

  return app;
};

module.exports = { createServer };
