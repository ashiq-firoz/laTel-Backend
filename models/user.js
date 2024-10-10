const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Ensures the name is provided
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures the email is unique
    match: /.+\@.+\..+/ // Simple regex for email validation
  },
  phone: {
    type: String,
    required: true,
    match: /^\d{10}$/ // Simple regex for 10-digit phone numbers
  }
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
