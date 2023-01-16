const router = require('express').Router();
const {
  createSponser,
  getSponsers,
  deleteSponser,
  updateSponser,
} = require('../controllers/sponser');
const { checkAdminAuth } = require('../middleware/adminAuth');

// Admin Register

router.post('/', checkAdminAuth, createSponser);
router.get('/', getSponsers);

router.put('/:sponserId', checkAdminAuth, updateSponser);
// Delete
router.delete('/:sponserId', checkAdminAuth, deleteSponser);

module.exports = router;
