const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 256,
  },
  email: {
    type: String,
    maxlength: 128,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Password length should be greater than 8 characters'],
  },
  favorites: [String],
  play_list: [String],
  watch_later: [String],
});

const User = new model('User', userSchema);

module.exports = User;
