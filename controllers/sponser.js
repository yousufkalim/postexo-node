const Sponsers = require('../models/Sponser');

exports.createSponser = async (req, res) => {
  try {
    let { email } = req.body;
    const existingSponser = await Sponsers.findOne({ email }); // Finding already existing sponser

    // Extra Validations
    if (existingSponser) {
      // If we found existing sponser in db
      return res.status(409).json({ success: false, message: 'Sponser already exists.' });
    }
    const sponser = await Sponsers.create(req.body); // Adding user in db
    // Done
    res.json({ success: true, sponser }); //Success
  } catch (err) {
    // Error handling
    // eslint-disable-next-line no-console
    console.log('Error ----> ', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.getSponsers = async (req, res) => {
  try {
    const sponsers = await Sponsers.find();
    res.json({ success: true, sponsers }); // Success
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.updateSponser = async (req, res) => {
  try {
    const sponserId = req.params.sponserId;
    const sponsers = await Sponsers.findByIdAndUpdate(sponserId, { ...req.body }, { new: true });
    res.json({ success: true, sponsers }); // Success
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteSponser = async (req, res) => {
  try {
    const sponserId = req.params.sponserId;
    const sponsers = await Sponsers.findByIdAndDelete(sponserId);
    res.json({ success: true, sponsers }); // Success
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
