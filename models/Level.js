const { Schema, model } = require('mongoose');

const levelSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

const Level = new model('Level', levelSchema);

module.exports = Level;
