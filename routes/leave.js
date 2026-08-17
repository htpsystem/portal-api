const express = require('express');
const router = express.Router();
const { applyLeave, updateLeaveStatus, getUserLeaves } = require('../controllers/leaveController');
const authenticateToken = require('../middleware/auth');

// Employee applies for leave
router.post('/', authenticateToken, applyLeave);

// Admin approves/rejects leave
router.put('/:id', authenticateToken, updateLeaveStatus);

// Fetch leave requests for a user
router.get('/:userId', authenticateToken, getUserLeaves);

module.exports = router;
