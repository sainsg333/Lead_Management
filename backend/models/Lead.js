const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  source: { type: String, required: true },
  status: { type: String, default: 'New' },
  referralCode: { type: String, default: '' }, // Add this line
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Lead', LeadSchema);