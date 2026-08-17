const express = require('express');
const router = express.Router();
const { getAttendanceSummary, getExceptionSummary, getLeaveSummary } = require('../controllers/dashboardController');
const authenticateToken = require('../middleware/auth');

// Admin-only dashboard endpoints
router.get('/attendance', authenticateToken, getAttendanceSummary);
router.get('/exceptions', authenticateToken, getExceptionSummary);
router.get('/leaves', authenticateToken, getLeaveSummary);

module.exports = router;
