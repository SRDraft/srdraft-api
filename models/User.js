const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
    required: true,
  },

  discordDetails: {
    username: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    discriminator: {
      type: String,
      required: true,
    },
    public_flags: {
      type: Number,
      required: true,
    },
    premium_type: {
      type: Number,
      required: true,
    },
    flags: {
      type: Number,
      required: true,
    },
    banner: {
      type: String,
      default: null,
    },
    accent_color: {
      type: String,
      default: null,
    },
    global_name: {
      type: String,
      required: true,
    },
    avatar_decoration_data: {
      type: String,
      default: null,
    },
    banner_color: {
      type: String,
      default: null,
    },
    mfa_enabled: {
      type: Boolean,
      required: true,
    },
    locale: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
      unique: true,
    },
  },
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
