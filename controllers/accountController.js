const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
  // Extract the authorization header
  const authHeader = req.headers['authorization'];
  
  // Extract the token after "Bearer"
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token using the JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the decoded token data to the req.user
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Token verification error:', err.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};


// Get dashboard information for the logged-in user
exports.getDashboardInfo = async (req, res) => {
  try {
    const userId = req.user.id;  // Use the id from req.user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      name : user.name,
      current_plan : user.current_plan,
      phone: user.phone,
      balance: user.balance,
      dataUsage: user.dataUsage,
      billStatus: 'up-to-date', // Example: could be from another source
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getBalance = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({ balance: user.balance });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getDataUsage = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({ dataUsage: user.dataUsage });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

