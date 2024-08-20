const { User, RewardHistory } = require('../models');

exports.createUser = async (req, res) => {
  const { id, name } = req.body;
  try {
    const user = await User.create({ name });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const user = await User.update({ name }, { where: { id } });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

};

exports.getUser = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findOne( { where: {id: id } });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
}

exports.getUsers = async (req, res) => {
    try {
      const user = await User.findAll( );
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
}

exports.getP5ById = async (req, res) => {
    try {
        const user = await User.findOne( { where: {id: req.params.id } });
        const rewardHistory = await RewardHistory.findAll( { where: {givenBy: req.params.id } })
        
      res.status(200).json({user:user,history:rewardHistory});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
}
