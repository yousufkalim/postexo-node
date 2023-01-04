const { createReport } = require('../controllers/reports');

const router = require('express').Router();

router.post('/', createReport);

module.exports = router;
