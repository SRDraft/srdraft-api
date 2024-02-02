require('dotenv').config();
const mongoose = require('mongoose');

async function dbConnect() {
  const dbUri =
    process.env.PROD_MONGODB || 'mongodb://127.0.0.1:27017/srDraftDB';

  mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return mongoose.connection;
}

function dbClose() {
  return mongoose.disconnect();
}

module.exports = { dbConnect, dbClose };
