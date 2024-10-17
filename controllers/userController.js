const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const User = require('../models/user'); 
const crypto = require('crypto'); 

const generateOtp = () => {
  return crypto.randomInt(100000, 999999).toString(); // 6-digit random number
};


// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { phone, password,email } = req.body;

    // Check if the user already exists
    let user = await User.findOne({ phone });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    user = new User({
      phone,
      password,
      email
    });

    // Save the user in the database
    await user.save();
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


exports.sendOtp = async (req, res) => {
  const { phone } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ phone });

    const email = user.email;

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Generate a new OTP
    const otp = generateOtp();

    // Update the user's password with the OTP
    user.password = otp;  // You might want to hash this OTP before saving it if required
    await user.save();

    // Prepare HTML content for the email
    const htmlContent = `<h1>Your OTP is: ${otp}</h1><p>Please use this OTP to log in or reset your password.</p>`;

    // Create the fetch URL, appending the email to the end of the URL
    const url = `${process.env.MAILSERVER_URL}?email=${encodeURIComponent(email)}`;

    // Make the POST request to the external service to send the email
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: htmlContent })  // Send the HTML content in the body
    });

    if (!response.ok) {
      return res.status(500).json({ message: 'Failed to send OTP' });
    }

    // If everything went well, respond with success
    res.json({ message: 'OTP sent successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};