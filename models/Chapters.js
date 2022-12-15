const { model, Schema } = require('mongoose');

const chapterSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  chapters: {
    start_time: {
      type: Date,
      required: true,
    },
    end_time: {
      type: Date,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    mute: Boolean,
  },
  session: {
    type: Schema.Types.ObjectId,
    ref: 'Session',
    required: true,
  },
});

const Chapter = new model('Chapter', chapterSchema);

module.exports = Chapter;
