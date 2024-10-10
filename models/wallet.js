const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    unique: true, // Ensure wallet address is unique
  },
  balance: {
    type: Number,
    required: true,
    default: 0, // Default balance is 0
  },
  created_at: {
    type: Date,
    default: Date.now, // Automatically records wallet creation date
  },
});

const Wallet = mongoose.model('Wallet', walletSchema);

module.exports = Wallet;
