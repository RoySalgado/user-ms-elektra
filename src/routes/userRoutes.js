const express = require('express');
const { createUser, login, getUsers, logout } = require('../controllers/userController');

const router = express.Router();

router.post('', createUser);
router.get('', getUsers);

module.exports = router;
