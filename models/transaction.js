const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  send_to: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0, // Ensures the amount is non-negative
  },
  transaction_date: {
    type: Date,
    default: Date.now, // Automatically records the transaction date
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
