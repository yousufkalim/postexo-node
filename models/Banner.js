// Init
const { Schema, model } = require('mongoose');

//  Schema
const bannerSchema = new Schema(
  {
    name: {
      type: String,
    },
    bannerImg: {
      type: String,
    },
    link: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

// Model
module.exports = model('banners', bannerSchema);
