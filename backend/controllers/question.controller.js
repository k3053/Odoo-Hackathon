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

exports.getQuestionById = async (req, res) => {
  const { id } = req.params;

  try {
    const question = await Question.findById(id);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.json(question);
  } catch (err) {
    res.status(500).json({ message: "Error fetching question", error: err.message });
  }
};


// exports.getAllQuestions = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 5;
//     const skip = (page - 1) * limit;

//     const total = await Question.countDocuments();
//     const questions = await Question.find()
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit)
//       .populate('answerIds');

//     res.json({
//       questions,
//       currentPage: page,
//       totalPages: Math.ceil(total / limit),
//       totalQuestions: total
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching questions', error: err.message });
//   }
// };

exports.getAllQuestions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 6;
    const skip = (page - 1) * pageSize;

    const filterType = req.query.filter || 'newest';
    const search = req.query.search || '';

    const query = {};

    // Text-based search
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    let sort = { createdAt: -1 }; // default newest

    // Apply "unanswered" logic
    if (filterType === 'unanswered') {
      query.$or = [
        { answerIds: { $exists: false } },
        { answerIds: { $size: 0 } }
      ];
    }

    // Future placeholder for "popular"
    if (filterType === 'popular') {
      sort = { 'answerIds.length': -1 }; // fallback
    }

    const total = await Question.countDocuments(query);
    const totalPages = Math.ceil(total / pageSize);

    const questions = await Question.find(query)
      .sort(sort)
      .skip(skip)
      .limit(pageSize);

    res.json({ questions, totalPages });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching questions', error: err.message });
  }
};
