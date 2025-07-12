const mongoose = require('mongoose');


const moderationSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
  answerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Answer' },
  action: { type: String, required: true },
  bannedStatus: { type: String, enum: ['Yes', 'No'] },
  reason: { type: String },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ModerationLog', moderationSchema);