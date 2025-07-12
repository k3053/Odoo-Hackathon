const Question = require('../models/question.model');

exports.askQuestion = async (req, res) => {
  const { title, description, tags } = req.body;
  try {
    const question = new Question({
      title,
      description,
      tags,
      username: req.user.username
    });
    await question.save();
    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ message: 'Error posting question', error: err.message });
  }
};

exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate('answerIds');
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching questions', error: err.message });
  }
};