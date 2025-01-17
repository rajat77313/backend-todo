const express = require('express');
const router = express.Router();
const { createuser, loginUser, getData } = require('../controllers/auth-controller')

router.route('/getData').get(getData);
router.route('/createUser').post(createuser);
router.route('/login').post(loginUser);


module.exports = router;  