const answerSchema = new mongoose.Schema({
  description: { type: String, required: true },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  accepted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  username: { type: String, required: true }
});

module.exports = mongoose.model('Answer', answerSchema);