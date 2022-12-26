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
  favorites: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
  },
  play_list: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
  },
  watch_later: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
  },
});

const User = new model('User', userSchema);

module.exports = User;
