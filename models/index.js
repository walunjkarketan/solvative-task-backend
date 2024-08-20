const sequelize = require('../config/database');
const User = require('./user');
const RewardHistory = require('./rewardHistory');

// Define associations if necessary

sequelize.sync({alter:true })
  .then(() => console.log('Tables created'))
  .catch((err) => console.log('Error: ' + err));

module.exports = {
  User,
  RewardHistory,
};
