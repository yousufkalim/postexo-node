const Report = require('../models/Report');
const Session = require('../models/Session');
const User = require('../models/User');

exports.createReport = async (req, res) => {
  try {
    const { user, session } = req.body;
    const report = new Report(req.body);
    const userExist = await User.findOne({ _id: user });

    if (!userExist) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const sessionExist = await Session.findOne({ _id: session });

    if (!sessionExist) {
      return res.status(404).json({
        message: 'Session not found',
      });
    }
    const newReport = await report.save();
    res.status(201).json({
      data: newReport,
    });
  } catch (err) {
    res.status(500).json({
      message: err?.message,
    });
  }
};
