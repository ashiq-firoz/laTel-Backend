const express = require('express');
const router = express.Router();


const authController = require('../controllers/authController');
const accountController = require('../controllers/accountController');
const paymentController = require('../controllers/paymentController');
const subscriptionController = require('../controllers/subscriptionController');
const offerController = require('../controllers/offerController');
const usersController = require("../controllers/userController");

router.get("/",(req,res)=>{
  res.render("index",{title:"OneConnect"})
})

router.post('/register', usersController.registerUser);

// User login (via OTP or password)
router.post('/login', authController.login);

router.post("/getOTP", usersController.sendOtp);

// Dashboard - View account balance and data usage
router.get('/dashboard', accountController.authenticateToken,accountController.getDashboardInfo);

// View account balance (as a separate route for balance-specific requests)
router.get('/balance', accountController.authenticateToken,accountController.getBalance);

router.get('/wallet', accountController.authenticateToken, usersController.getWallet); // Get wallet details
router.post('/wallet/add-balance', accountController.authenticateToken, usersController.addBalance); // Add balance to wallet

// Track data usage
router.get('/data-usage', accountController.authenticateToken,accountController.getDataUsage);

// Bill payment
router.post('/pay-bill', accountController.authenticateToken,paymentController.payBill);

// Subscription management - modify telecom plan, renew subscription
router.post('/manage-subscription', accountController.authenticateToken,subscriptionController.modifySubscription);

// View exclusive offers and promotions
router.get('/offers', accountController.authenticateToken,offerController.getOffers);

// Support routes (optional based on UI, if integrated via API)
router.get('/support', (req, res) => {
    res.json({
        supportChannels: ['chat', 'email', 'phone'],
        message: 'Choose a support channel for assistance.'
    });
});

module.exports = router;
