const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  plan_no: {
    type: String,
    required: true,
  },
  due_date: {
    type: Date,
    required: true,
  },
  subscription_date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['active', 'expired', 'canceled'],
    default: 'active',
  },
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
