const { User, RewardHistory } = require('../models');

// Create a new P5 transaction and update balances
exports.createTransaction = async (req, res) => {

    const givenTo = req.body.userId
    const givenBy = req.params.id
    const points = req.body.amount
  
  try {
    const userFrom = await User.findByPk(givenBy);
    const userTo = await User.findByPk(givenTo);
  
   

    if (!userFrom || !userTo) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (userFrom.p5Balance < points) {
      return res.status(400).json({ error: 'Insufficient P5 balance' });
    }

    // Update balances
    userFrom.p5Balance -= points;
    userTo.rewardsBalance += points;

    await userFrom.save();
    await userTo.save();

    // Record the transaction in RewardHistory
    const transaction = await RewardHistory.create({ points, givenBy, givenTo });
    res.status(201).json(transaction);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
};

// Delete a P5 transaction and revert balances
exports.deleteTransaction = async (req, res) => {
    const { id } = req.params;
    
    try {
      const transaction = await RewardHistory.findByPk(id);
  
      if (!transaction) {
        return res.status(404).json({ error: 'Transaction not found' });
      }
  
      const userFrom = await User.findByPk(transaction.givenBy);
      const userTo = await User.findByPk(transaction.givenTo);
  
      if (!userFrom || !userTo) {
        return res.status(404).json({ error: 'One or both users not found' });
      }
  
      // Reverse the transaction by adjusting balances
      userFrom.p5Balance = Number(userFrom.p5Balance) + Number(transaction.points);
      userTo.rewardsBalance = Number(userTo.rewardsBalance) - Number(transaction.points);
  
      // Save the updated user balances
      await userFrom.save();
      await userTo.save();
  
      // Delete the transaction record
      await transaction.destroy();
  
      res.status(200).json({ message: 'Transaction deleted and balances updated' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

// Retrieve rewards balance for a user
exports.getRewardsBalance = async (req, res) => {
  const { id } = req.params;
  console.log(req.params)
  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json( user );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
