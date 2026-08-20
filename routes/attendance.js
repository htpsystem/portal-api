const express = require('express');
const router = express.Router();
const { checkIn, checkOut, getUserAttendance } = require('../controllers/attendanceController');
const authenticateToken = require('../middleware/auth');

// Employee check-in
router.post('/checkin', authenticateToken, checkIn);

// Employee check-out
router.post('/checkout', authenticateToken, checkOut);

// Fetch attendance logs
router.get('/', authenticateToken, getUserAttendance);

module.exports = router;
