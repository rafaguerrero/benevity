const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/login.controller');

// Login
router.route('/login').post(LoginController.login);

module.exports = router;
