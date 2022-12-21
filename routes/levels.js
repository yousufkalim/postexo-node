const { getAllStudentLevels } = require('../controllers/levels');

const router = require('express').Router();

router.get('/', getAllStudentLevels);

module.exports = router;
