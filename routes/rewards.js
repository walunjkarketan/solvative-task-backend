const express = require('express');
const router = express.Router();
const { createTransaction, deleteTransaction, getRewardsBalance } = require('../controllers/rewardsController');

// Create a P5 transaction
router.post('/:id/rewards', createTransaction);

// Delete a P5 transaction
router.delete('/:id/p5/:entryId', deleteTransaction);

// Get rewards balance for a specific user
router.get('/users/:id/rewards', getRewardsBalance);

module.exports = router;
