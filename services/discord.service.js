const axios = require('axios');

class DiscordService {
  static async getUserDetails(accessToken) {
    const userDetails = await axios.get('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const avatarUrl = this.createAvatarUrl(userDetails.data);

    return {
      ...userDetails.data,
      avatarUrl,
    };
  }

  static createAvatarUrl(discordUserDetails) {
    return `https://cdn.discordapp.com/avatars/${discordUserDetails.id}/${discordUserDetails.avatar}.png`;
  }
}

module.exports = { DiscordService };
