const Referral = require("../models/Referral");

exports.createReferral = async (req, res) => {
  const { lead_id, referralCode } = req.body;
  try {
    const referral = new Referral({ lead_id, referralCode });
    await referral.save();
    res.status(201).json(referral);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getReferralByLeadId = async (req, res) => {
  const { lead_id } = req.params;
  try {
    const referral = await Referral.findOne({ lead_id });
    if (!referral) throw new Error("Referral not found");
    res.status(200).json(referral);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};