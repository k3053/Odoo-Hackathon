const mongoose = require('mongoose');


const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [String],
  answerIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }],
  createdAt: { type: Date, default: Date.now },
  username: { type: String, required: true }
});

questionSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Question', questionSchema);