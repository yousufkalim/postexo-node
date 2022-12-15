const { model, Schema } = require('mongoose');

const playlistSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    maxlength: 128,
  },
  sessions: {
    type: [Schema.Types.ObjectId],
    ref: 'Session',
  },
});

const Playlist = new model('Playlist', playlistSchema);

module.exports = Playlist;
