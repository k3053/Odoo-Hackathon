const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['User', 'Admin'], required: true },
  isBanned: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

userSchema.methods.generateAuthToken = function() {
  return jwt.sign({ _id: this._id, username: this.username, role: this.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

module.exports = mongoose.model('User', userSchema);
