const express = require('express');
const router = express.Router();
const { createuser, loginUser, getData, checkUser, logout } = require('../controllers/auth-controller')

router.route('/getData').get(getData);
router.route('/createUser').post(createuser);
router.route('/login').post(loginUser);
router.route('/checkUser').get(checkUser);
router.route('/logout').get(logout);


module.exports = router;  