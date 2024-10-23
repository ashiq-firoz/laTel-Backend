const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const Wallet = require('../models/wallet');
const User = require('../models/user'); 
const crypto = require('crypto'); 

const generateOtp = () => {
  return crypto.randomInt(100000, 999999).toString(); // 6-digit random number
};


exports.getUser = async (req,res)=>{
  try{
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({name:user.name,email:user.email});
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    // Find user by ID from the request
    const user = await User.findById(req.user.id);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user fields with the data provided in the request body
    const { name, email } = req.body; // Expect phone and email in the request body

    // Optionally validate the incoming data here...

    // Update user properties
    if (name) user.name = name;
    if (email) user.email = email;

    // Save the updated user
    await user.save();

    // Respond with the updated user's phone and email
    res.json({
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Fetch wallet details for an authenticated user
exports.getWallet = async (req, res) => {
  try {
    // Find the user by ID (set by authenticateToken middleware)
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the wallet associated with the user's phone or unique identifier
    const wallet = await Wallet.findOne({ address: user.phone }); // Adjust if wallets are associated differently
    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    // Send the wallet information (address and balance)
    res.json({ address: wallet.address, balance: wallet.balance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add balance to the authenticated user's wallet
exports.addBalance = async (req, res) => {
  const { amount } = req.body;

  // Validate that the amount is a positive number
  if (!amount || amount <= 0) {
    return res.status(400).json({ message: 'Invalid amount. Must be greater than zero.' });
  }

  try {
    // Find the user by ID
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the wallet associated with the user
    const wallet = await Wallet.findOne({ address: user.phone });
    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    // Add the amount to the wallet balance
    wallet.balance += amount;
    await wallet.save(); // Save the updated wallet

    res.json({ message: 'Balance added successfully', balance: wallet.balance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
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