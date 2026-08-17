const express = require('express');
const router = express.Router();
const { addException, getUserExceptions } = require('../controllers/exceptionController');
const authenticateToken = require('../middleware/auth');

// Employee/Admin logs an exception
router.post('/', authenticateToken, addException);

// Fetch exceptions for a user
router.get('/:userId', authenticateToken, getUserExceptions);

module.exports = router;
