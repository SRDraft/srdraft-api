const { DataDragonService } = require('../services/dataDragon.service');
const { Config, Champion } = require('../models');
const cron = require('node-cron');

const updateChampionsBasedOnVersion = async () => {
  // const version = await Config.getLoLVersion();
  const latestDbVersion = await Config.getLoLVersion();
  const latestDataDragonVersion = await DataDragonService.getLatestVersion();

  console.log({ latestDbVersion, latestDataDragonVersion });

  if (latestDbVersion !== latestDataDragonVersion) {
    console.log('Updating champions and version in the db');
    await Config.setLoLVersion(latestDataDragonVersion); // update the version in the db
    await updateChampions(latestDataDragonVersion); // update the champions in the db
    console.log('Champions and version updated');
  }
};

const updateChampions = async (version) => {
  const champions = await DataDragonService.getChampions(version);

  for (const champion of champions) {
    await Champion.findOneAndUpdate({ key: champion.key }, champion, {
      upsert: true,
    });
  }

  console.log('Champions updated');
};

const updateChampionsBasedOnVersionJob = () => {
  // run it every day at midnight
  cron.schedule('0 0 * * *', async () => {
    await updateChampionsBasedOnVersion();
  });

  // run it once on startup
  updateChampionsBasedOnVersion();
};

module.exports = { updateChampionsBasedOnVersionJob };
