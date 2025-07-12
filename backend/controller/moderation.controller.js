const ModerationLog = require('../models/moderation.model');

exports.logModeration = async (req, res) => {
  const { questionId, answerId, action, bannedStatus, reason } = req.body;
  try {
    const log = new ModerationLog({ questionId, answerId, action, bannedStatus, reason });
    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ message: 'Error logging moderation', error: err.message });
  }
};

exports.getModerationLogs = async (req, res) => {
  try {
    const logs = await ModerationLog.find();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching logs', error: err.message });
  }
};