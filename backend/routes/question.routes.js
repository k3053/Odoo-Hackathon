const express = require('express');
const router = express.Router();
const questionController = require('../controllers/question.controller');
const { auth } = require('../middleware/auth');

router.post('/', auth, questionController.askQuestion);
router.get('/', questionController.getAllQuestions);
router.get('/:id', questionController.getQuestionById);

module.exports = router;