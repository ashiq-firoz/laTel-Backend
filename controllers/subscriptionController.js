const User = require('../models/user');

exports.modifySubscription = async (req, res) => {
    const { newPlan } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.subscription = newPlan;
        await user.save();

        res.json({ message: 'Subscription updated', newPlan: user.subscription });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
