const express = require('express');
const users = require('../Controllers/UsersController')

const router = express.Router();
router.post('/signup',users.postUser)
router.post('/login',users.getUser)
router.get('/check/:uid',users.checkUser)

module.exports = router