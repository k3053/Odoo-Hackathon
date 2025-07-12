const express = require('express');
const router = express.Router();
const answerController = require('../controllers/answer.controller');
const { auth } = require('../middleware/auth');

router.post('/', auth, answerController.postAnswer);
router.post('/vote', auth, answerController.voteAnswer);
router.post('/accept', auth, answerController.acceptAnswer);

module.exports = router;