const { createPlaylist, updatePlayList } = require('../controllers/playlist');

const router = require('express').Router();

router.post('/', createPlaylist);
router.patch('/:playlistId', updatePlayList);

module.exports = router;
