const express = require('express');
const asyncHandler = require('../middleware/asyncHandler');
const { getUser, createUser, updateTimezone } = require('../controllers/userController');

const router = express.Router();

router.get('/', asyncHandler(getUser));
router.post('/', asyncHandler(createUser));
router.patch('/:id/timezone', asyncHandler(updateTimezone));

module.exports = router;