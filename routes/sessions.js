const {
  getAllSessions,
  getSessionById,
  addCommentToSession,
  likeSession,
  dislikeSession,
  addViewToSession,
  shareSession,
  actionOnSession,
  favouriteSession,
  playlistSession,
  watchLaterSession,
  getSessionsByProfessor,
  getSessionsByMatter,
  createSession,
} = require('../controllers/sessions');
const { checkAuth } = require('../middleware/checkAuth');
const { webhookCheckAuth } = require('../middleware/webhookCheckAuth');

const router = require('express').Router();

router.get('/', getAllSessions);
router.post('/', webhookCheckAuth, createSession);
router.get('/getByProfessor', checkAuth, getSessionsByProfessor);
router.get('/getByMatter', checkAuth, getSessionsByMatter);
router.get('/:sessionId', checkAuth, getSessionById);
router.post('/addComment/:sessionId', checkAuth, addCommentToSession);
router.patch('/favourites/:sessionId', checkAuth, favouriteSession);
router.patch('/playlist/:sessionId', checkAuth, playlistSession);
router.patch('/watchlater/:sessionId', checkAuth, watchLaterSession);
router.post('/like/:sessionId', checkAuth, likeSession);
router.post('/dislike/:sessionId', checkAuth, dislikeSession);
router.post('/view/:sessionId', checkAuth, addViewToSession);
router.post('/share/:sessionId', checkAuth, shareSession);

router.patch('/:sessionId', checkAuth, actionOnSession);
module.exports = router;
