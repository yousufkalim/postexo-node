const { model, Schema } = require('mongoose');

const subscriptionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  package: {
    type: Schema.Types.ObjectId,
    ref: 'Package',
  },
  expired: Boolean,
  expiry_date: {
    type: Date,
    required: true,
  },
});

const Subscription = new model('Subscription', subscriptionSchema);

module.exports = Subscription;
