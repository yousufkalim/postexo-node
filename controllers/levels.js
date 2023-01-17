const Level = require('../models/Level');

exports.getAllStudentLevels = async (req, res) => {
  try {
    const levels = await Level.find();

    res.status(200).json({ levels });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createStudentLevel = async (req, res) => {
  try {
    const { id, label } = req.body;
    const dataToSave = {
      id: id,
      label,
    };
    const findLevel = await Level.findOne({ id: id });
    if (findLevel) {
      await Level.findOneAndUpdate({ id }, dataToSave, { new: true });
      res.status(200).json({ message: 'Student level updated successfully' });
    } else {
      const newLevel = new Level(dataToSave);
      await newLevel.save();
      res.status(200).json({ data: newLevel, message: 'Student level created successfully' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
