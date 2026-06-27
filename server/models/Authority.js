const mongoose = require('mongoose');

const authoritySchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  description: { type: String, required: true },
  photoUrl: { type: String, required: true }, // Local path string
}, {
  timestamps: true
});

module.exports = mongoose.model('Authority', authoritySchema);
