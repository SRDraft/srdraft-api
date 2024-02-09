const mongoose = require('mongoose');
const Config = require('./Config');

const championSchema = new mongoose.Schema({
  version: { type: String, required: true },
  id: { type: String, required: true },
  key: { type: String, required: true },
  name: { type: String, required: true },
  title: { type: String, required: true },
  blurb: { type: String, required: true },
  info: {
    attack: { type: Number, required: true },
    defense: { type: Number, required: true },
    magic: { type: Number, required: true },
    difficulty: { type: Number, required: true },
  },
  image: {
    full: { type: String, required: true },
    sprite: { type: String, required: true },
    group: { type: String, required: true },
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    w: { type: Number, required: true },
    h: { type: Number, required: true },
  },
  tags: [{ type: String, required: true }],
  partype: { type: String, required: true },
  stats: {
    hp: { type: Number, required: true },
    hpperlevel: { type: Number, required: true },
    mp: { type: Number, required: true },
    mpperlevel: { type: Number, required: true },
    movespeed: { type: Number, required: true },
    armor: { type: Number, required: true },
    armorperlevel: { type: Number, required: true },
    spellblock: { type: Number, required: true },
    spellblockperlevel: { type: Number, required: true },
    attackrange: { type: Number, required: true },
    hpregen: { type: Number, required: true },
    hpregenperlevel: { type: Number, required: true },
    mpregen: { type: Number, required: true },
    mpregenperlevel: { type: Number, required: true },
    crit: { type: Number, required: true },
    critperlevel: { type: Number, required: true },
    attackdamage: { type: Number, required: true },
    attackdamageperlevel: { type: Number, required: true },
    attackspeedperlevel: { type: Number, required: true },
    attackspeed: { type: Number, required: true },
  },
  avatar: String,
});

// set the avatar url before saving
championSchema.pre(
  /^(save|create|findOneAndUpdate|updateOne)/,
  async function (next) {
    const currentVersion = await Config.getLoLVersion();

    // check if the update payload has the avatar in it
    const avatarExistsInPayload = this._update && this._update.avatar;

    if (avatarExistsInPayload) {
      return next();
    }

    this.avatar = `https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/champion/${this.id}.png?format=webp&quality=lossless`;

    next();
  }
);
