const express = require('express');
const { createUser, getUsers, getUserById, deleteUserById } = require('../controllers/userController');

const router = express.Router();

router.post('', createUser);
router.get('', getUsers);
router.get('/:id', getUserById);
router.delete('/:id', deleteUserById);

module.exports = router;
