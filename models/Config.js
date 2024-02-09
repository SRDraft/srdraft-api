const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: String,
    required: true,
  },
});

// add a method to set the league of legends version
configSchema.statics.setLoLVersion = async function (version) {
  const config = await this.findOne({ key: 'LOL_VERSION' });

  if (config) {
    config.value = version;
    return config.save();
  }

  return this.create({ key: 'LOL_VERSION', value: version });
};

const Config = mongoose.model('Config', configSchema);

module.exports = { Config };
