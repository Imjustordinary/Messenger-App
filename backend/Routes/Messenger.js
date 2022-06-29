const express = require('express');
const messengers = require('../Controllers/MessengerController')

const router = express.Router();
router.post('/create',messengers.postMessenger)


module.exports = router