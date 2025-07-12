const express = require('express');
const router = express.Router();
const moderationController = require('../controllers/moderation.controller');
const { auth, isAdmin } = require('../middleware/auth');

router.post('/', auth, isAdmin, moderationController.logModeration);
router.get('/', auth, isAdmin, moderationController.getModerationLogs);

module.exports = router;