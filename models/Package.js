const { model, Schema } = require('mongoose');

const packageSchema = new Schema({
  title: {
    type: String,
    reuired: true,
    maxlength: 128,
  },
  description: {
    type: String,
    maxlength: 512,
  },
  type: {
    type: String,
    enum: ['1m', '3m', '9m', '12m'],
  },
  price: {
    type: String,
    required: true,
  },
});

const Package = new model('Package', packageSchema);

module.exports = Package;
