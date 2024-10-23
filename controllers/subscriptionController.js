const User = require('../models/user');

exports.renewPlan = async (req,res) => {
    

    try{
        const user = await User.findById(req.user.id);

        // Check if user exists
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        // Update user fields with the data provided in the request body
        const {plan,value} = req.body;
        console.log(plan,value)
    
        // Optionally validate the incoming data here...
    
        // Update user properties
        if (plan) user.current_plan = plan;
        if (value) user.balance = value;
    
        // Save the updated user
        await user.save();
    
        // Respond with the updated user's phone and email
        res.json({
          plan: user.plan,
          value: user.value,
        });
    }
    catch(err)
    {
        console.log(err);
        res.json("Server error");
    }
};

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
