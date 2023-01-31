const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

// Create A New User
router.route('/user').post(UserController.addUser);

module.exports = router;
