const express = require('express');
const asyncHandler = require('../middleware/asyncHandler');
const {getEventById, createEvent, updateEvent, getEventLogs, getEvent} = require('../controllers/eventController.js')

const router = express.Router();

router.get('/', asyncHandler(getEvent));
router.post('/', asyncHandler(createEvent));
router.get('/:id', asyncHandler(getEventById));
router.put('/:id', asyncHandler(updateEvent));
router.get('/:id/logs', asyncHandler(getEventLogs));

module.exports = router;