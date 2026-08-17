const express = require('express');
const router = express.Router();
const { getUser, updateUser } = require('../controllers/userController');
const authenticateToken = require('../middleware/auth');

router.get('/:id', authenticateToken, getUser);
router.put('/:id', authenticateToken, updateUser);

module.exports = router;
