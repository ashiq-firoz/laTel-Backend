const User = require('../models/user');

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { phone, password } = req.body;

    // Check if the user already exists
    let user = await User.findOne({ phone });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    user = new User({
      phone,
      password
    });

    // Save the user in the database
    await user.save();
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
