const { DataDragonService } = require('../services/dataDragon.service');
const { Config } = require('../models/Config');
const cron = require('node-cron');

const setConfigLatestLoLVersion = async () => {
  const latestVersion = await DataDragonService.getLatestVersion();
  await Config.setLoLVersion(latestVersion);

  console.log('Latest version set to:', latestVersion);

  return latestVersion;
};

const setConfigLatestLoLVersionJob = () => {
  // run it every day at midnight
  cron.schedule('0 0 * * *', async () => {
    await setConfigLatestLoLVersion();
  });

  // run it once on startup
  setConfigLatestLoLVersion();
};

module.exports = { setConfigLatestLoLVersionJob };
