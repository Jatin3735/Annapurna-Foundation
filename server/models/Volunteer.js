const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  occupation: { type: String, required: true },
  reasonForJoining: { type: String, required: true },
  status: { type: String, default: 'Pending', enum: ['Pending', 'Approved', 'Rejected'] },
  registrationNumber: { type: String, unique: true, sparse: true },
  certificateNumber: { type: String },
  certificateIssueDate: { type: Date },
  certificateDate: { type: Date },
}, {
  timestamps: true
});

module.exports = mongoose.model('Volunteer', volunteerSchema);
