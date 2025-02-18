const Lead = require('../models/Lead');


exports.createLead = async (req, res) => {
  try {
    const { name, contact, source, status, referralCode } = req.body;
    const lead = new Lead({ name, contact, source, status, referralCode });
    await lead.save();
    res.status(201).json(lead);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Other functions remain unchanged...

exports.getLeads = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const leads = await Lead.find(filter);
    res.status(200).json(leads);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
exports.gotLead = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID is required" });

    const lead = await Lead.findById(id);
    if (!lead) return res.status(404).json({ error: "Lead not found" });

    res.status(200).json(lead);
  } catch (err) {
    console.error("Error fetching lead:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const lead = await Lead.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(lead);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};