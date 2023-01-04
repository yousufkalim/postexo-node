const { Schema, model } = require('mongoose');

const reportSchema = new Schema(
  {
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      maxlength: 2000,
    },
    comment: {
      type: String,
      maxlength: 1028,
    },
    email: {
      type: String,
      maxlength: 128,
      required: [true, 'Email is required'],
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    session: {
      type: Schema.Types.ObjectId,
      ref: 'Session',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Report = new model('Report', reportSchema);

module.exports = Report;
