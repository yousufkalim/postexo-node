const { model, Schema } = require('mongoose');

const sessionSchema = new Schema({
  session: {
    type: Number,
    required: true,
  },
  subject: {
    type: String,
  },
  chapters: String,
  regular: {
    type: String,
  },
  difficulty_level: {
    type: String,
  },
  resolution_file: String,
  duration: {
    type: String,
    required: true,
  },
  student_level: String,
  message: String,
  student_name: {
    type: String,
    required: true,
  },
  professor_name: {
    type: String,
    required: true,
  },
  studnet_rating: Number,
  photos: [String],
  twilio_audio: String,
  session_recording: String,
  fb_data: {
    type: String,
  },
  twilio_createAt: Date,
  created_at: Date,
  likes: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
  },
  dislikes: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
  },
  views: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
  },
  shares: Number,
  matter: String,
  comments: [
    {
      type: new Schema(
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
          },
          comment: String,
        },
        { timestamps: true },
      ),
    },
  ],
  ratings: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      rating: {
        type: Number,
      },
    },
  ],
  averageRating: {
    type: Number,
    default: 0,
  },
  created_at_from_twilio: Date,
});

const Session = new model('Session', sessionSchema);

module.exports = Session;
