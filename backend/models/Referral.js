const mongoose = require("mongoose");

const ReferralSchema = new mongoose.Schema({
  lead_id: { type: mongoose.Schema.Types.ObjectId, ref: "Lead", required: true },
  referralCode: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Referral", ReferralSchema);