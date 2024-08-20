const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const RewardHistory = sequelize.define('RewardHistory', {
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  points: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  givenBy: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  givenTo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
});

module.exports = RewardHistory;
