// Init
const { Schema, model } = require('mongoose');

//  Schema
const sponserSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

// Model
module.exports = model('sponsers', sponserSchema);
