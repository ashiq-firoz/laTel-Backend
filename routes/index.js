const express = require('express');
const router = express.Router();


const authController = require('../controllers/authController');
const accountController = require('../controllers/accountController');
const paymentController = require('../controllers/paymentController');
const subscriptionController = require('../controllers/subscriptionController');
const offerController = require('../controllers/offerController');

router.get("/",(req,res)=>{
  res.render("index",{title:"OneConnect"})
})

// User login (via OTP or password)
router.post('/login', authController.login);

// Dashboard - View account balance and data usage
router.get('/dashboard', accountController.getDashboardInfo);

// View account balance (as a separate route for balance-specific requests)
router.get('/balance', accountController.getBalance);

// Track data usage
router.get('/data-usage', accountController.getDataUsage);

// Bill payment
router.post('/pay-bill', paymentController.payBill);

// Subscription management - modify telecom plan, renew subscription
router.post('/manage-subscription', subscriptionController.modifySubscription);

// View exclusive offers and promotions
router.get('/offers', offerController.getOffers);

// Support routes (optional based on UI, if integrated via API)
router.get('/support', (req, res) => {
    res.json({
        supportChannels: ['chat', 'email', 'phone'],
        message: 'Choose a support channel for assistance.'
    });
});

module.exports = router;
