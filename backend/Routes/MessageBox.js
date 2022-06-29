const express = require('express');
const messagebox = require('../Controllers/MessageBoxController')

const router = express.Router();
router.post('/start/:uid',messagebox.postMessageBox)
router.get('/start',messagebox.getMessageBox)


module.exports = router