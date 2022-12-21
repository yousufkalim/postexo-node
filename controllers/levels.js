const Level = require('../models/Level');

exports.getAllStudentLevels = async (req, res) => {
  try {
    const levels = await Level.find();

    res.status(200).json({ levels });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
