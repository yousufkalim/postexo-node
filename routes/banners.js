const router = require('express').Router();
const { createBanner, getBanners, deleteBanner, updateBanner } = require('../controllers/banner');
const { checkAdminAuth } = require('../middleware/adminAuth');
const { upload } = require('../middleware/multer');

// Admin Register

router.post('/', checkAdminAuth, upload.single('bannerImg'), createBanner);
router.get('/', getBanners);

router.put('/:bannerId', checkAdminAuth, upload.single('bannerImg'), updateBanner);
// Delete
router.delete('/:bannerId', checkAdminAuth, deleteBanner);

module.exports = router;
