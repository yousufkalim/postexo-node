const { Schema, model } = require('mongoose');

const reportSchema = new Schema(
  {
    reason: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    comment: {
      type: String,
      maxlength: 1028,
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
