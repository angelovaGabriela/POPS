const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { sessionController } = require('../controllers');

// CREATE session
router.post('/', auth(), sessionController.createSession);

// GET all sessions
router.get('/', sessionController.getSessions);

// GET one session
router.get('/:id', sessionController.getSessionById);

// UPDATE session
router.put('/:sessionId', auth(), sessionController.updateSession);

// DELETE session
router.delete('/:sessionId', auth(), sessionController.deleteSession);

module.exports = router;
