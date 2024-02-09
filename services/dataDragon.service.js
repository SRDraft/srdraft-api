const axios = require('axios');

class DataDragonService {
  static async getVersions() {
    const versions = await axios.get(
      'https://ddragon.leagueoflegends.com/api/versions.json'
    );

    return versions.data;
  }

  static async getLatestVersion() {
    const versions = await this.getVersions();
    return versions[0];
  }

  static async getChampions() {
    const version = await this.getLatestVersion();
    const champions = await axios.get(
      `http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
    );

    // return as array rather than object
    return Object.values(champions.data.data);
  }
}

module.exports = { DataDragonService };
