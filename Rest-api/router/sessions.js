const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { sessionController } = require('../controllers');

// middleware that is specific to this router

router.get('/', sessionController.getLatestsSessions);

module.exports = router
