const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { categoryController, sessionController } = require('../controllers');

// middleware that is specific to this router

router.get('/', categoryController.getCategories);
router.post('/', auth(), categoryController.createCategory);

router.get('/:categoryId', categoryController.getCategory);
router.post('/:categoryId', auth(), sessionController.createSession);
router.put('/:categoryId', auth(), categoryController.subscribe);
router.put('/:categoryId/sessions/:sessionId', auth(), sessionController.editSession);
router.delete('/:categoryId/sessions/:sessionId', auth(), sessionController.deleteSession);

// router.get('/my-trips/:id/reservations', auth(), categoryController.getReservations);

module.exports = router
