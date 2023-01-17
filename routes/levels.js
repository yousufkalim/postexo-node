const { getAllStudentLevels, createStudentLevel } = require('../controllers/levels');
const { checkAuth } = require('../middleware/checkAuth');
const { webhookCheckAuth } = require('../middleware/webhookCheckAuth');

const router = require('express').Router();

router.get('/', checkAuth, getAllStudentLevels);
router.post('/', webhookCheckAuth, createStudentLevel);

module.exports = router;
