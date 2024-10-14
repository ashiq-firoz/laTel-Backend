const User = require('../models/user');

exports.getOffers = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const offers = [
            { id: 1, title: '50% off on next recharge', eligible: true },
            { id: 2, title: 'Free 1GB data on monthly recharge', eligible: false }
        ];

        const eligibleOffers = offers.filter(offer => offer.eligible);

        res.json({ offers: eligibleOffers });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
