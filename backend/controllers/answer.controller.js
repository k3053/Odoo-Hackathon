const Answer = require('../models/answer.model');
const Question = require('../models/question.model');

exports.postAnswer = async (req, res) => {
  const { description, questionId } = req.body;
  try {
    const answer = new Answer({
      description,
      questionId,
      username: req.user.username
    });
    await answer.save();

    await Question.findByIdAndUpdate(questionId, { $push: { answerIds: answer._id } });
    res.status(201).json(answer);
  } catch (err) {
    res.status(500).json({ message: 'Error posting answer', error: err.message });
  }
};

exports.voteAnswer = async (req, res) => {
  const { answerId, voteType } = req.body; // voteType = 'up' or 'down'
  try {
    const answer = await Answer.findById(answerId);
    if (!answer) return res.status(404).json({ message: 'Answer not found' });

    if (voteType === 'up') answer.upvotes++;
    else if (voteType === 'down') answer.downvotes++;

    await answer.save();
    res.json(answer);
  } catch (err) {
    res.status(500).json({ message: 'Error voting answer', error: err.message });
  }
};

exports.acceptAnswer = async (req, res) => {
  const { answerId } = req.body;
  try {
    await Answer.findByIdAndUpdate(answerId, { accepted: true });
    res.json({ message: 'Answer marked as accepted' });
  } catch (err) {
    res.status(500).json({ message: 'Error accepting answer', error: err.message });
  }
};

exports.getAnswersByQuestionId = async (req, res) => {
  const { questionId } = req.query;

  try {
    if (!questionId) {
      return res.status(400).json({ message: "questionId is required" });
    }

    const answers = await Answer.find({ questionId }).sort({ createdAt: -1 });

    res.json(answers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching answers", error: err.message });
  }
};
