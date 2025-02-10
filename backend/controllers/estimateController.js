const Estimate = require('../models/Estimate');

exports.createEstimate = async (req, res) => {
  try {
    const estimate = new Estimate(req.body);
    await estimate.save();
    res.status(201).json(estimate);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getEstimates = async (req, res) => {
  try {
    const { lead_id, status } = req.query;
    const filter = {};
    if (lead_id) filter.lead_id = lead_id;
    if (status) filter.status = status;
    const estimates = await Estimate.find(filter).populate('lead_id');
    res.status(200).json(estimates);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.gotEstimate = async (req, res) => {
  try {
    const { lead_id} = req.query;
    const filter = {};
    if (lead_id) filter.lead_id = lead_id;
    const estimate = await Estimate.find(filter);
    res.status(200).json(estimate);

  } catch (err) {
    console.error("Error fetching lead:", err);
    res.status(500).json({ error: err.message });
  }
};
exports.updateEstimate = async (req, res) => {
  try {
    const { id } = req.params;
    const estimate = await Estimate.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(estimate);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};