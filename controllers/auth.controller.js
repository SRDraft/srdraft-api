const { DiscordService } = require('../services/discord.service');
const User = require('../models/User');

exports.discordLogin = async (req, res) => {
  try {
    const { discordAccessToken } = req.body;

    if (!discordAccessToken) {
      return res.status(400).send('Bad request');
    }

    const discordUserDetails = await DiscordService.getUserDetails(
      discordAccessToken
    );

    // if user already exists, return user
    const foundUser = await User.findOne({
      'discordDetails.id': discordUserDetails.id,
    }).lean();

    if (foundUser?._id) {
      return res
        .status(200)
        .json({ message: 'user already exists', user: foundUser });
    }

    // save user to database
    const newUser = await User.create({
      username: discordUserDetails.username,
      displayName:
        discordUserDetails.global_name ?? discordUserDetails.username,
      avatarUrl: discordUserDetails.avatarUrl,
      discordDetails: discordUserDetails,
    });

    return res
      .status(202)
      .json({ message: 'new user created!', user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal server error');
  }
};
