const express = require('express');
const router = express.Router();
const { createUser, editUser,getUser,getUsers,getP5ById } = require('../controllers/userController');

router.post('/', createUser);
router.put('/:id', editUser);
router.get('/:id', getUser);
router.get('/', getUsers);
router.get('/:id/p5', getP5ById);

module.exports = router;
