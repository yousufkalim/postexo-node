const Banner = require('../models/Banner');

exports.createBanner = async (req, res) => {
  try {
    const banner = await Banner.create({ ...req.body, bannerImg: req.file.path }); // Adding  in db
    // Done
    res.json({ success: true, banner }); //Success
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.getBanners = async (req, res) => {
  try {
    const banners = await Banner.find();
    res.json({ success: true, banners }); // Success
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateBanner = async (req, res) => {
  try {
    const bannerID = req.params.bannerId;
    if (req.file) {
      req.body.bannerImg = req.file.path;
    }
    const banner = await Banner.findByIdAndUpdate(bannerID, { ...req.body }, { new: true });
    res.json({ success: true, banner }); // Success
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.deleteBanner = async (req, res) => {
  try {
    const bannerId = req.params.bannerId;
    const banners = await Banner.findByIdAndDelete(bannerId);
    res.json({ success: true, banners }); // Success
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
