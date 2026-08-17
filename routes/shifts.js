const express = require('express');
const router = express.Router();
const { createShift, getUserShifts } = require('../controllers/shiftController');
const authenticateToken = require('../middleware/auth');

// Admin creates a shift
router.post('/', authenticateToken, createShift);

// Employee/Admin fetch shifts
router.get('/:userId', authenticateToken, getUserShifts);

module.exports = router;
