const {
  getAllSessions,
  getSessionById,
  addCommentToSession,
  likeSession,
  dislikeSession,
  addViewToSession,
  shareSession,
  actionOnSession,
} = require('../controllers/sessions');
const { checkAuth } = require('../middleware/checkAuth');

const router = require('express').Router();

router.get('/', getAllSessions);
router.get('/:sessionId', checkAuth, getSessionById);
router.post('/addComment/:sessionId', checkAuth, addCommentToSession);
router.post('/like/:sessionId', checkAuth, likeSession);
router.post('/dislike/:sessionId', checkAuth, dislikeSession);
router.post('/view/:sessionId', checkAuth, addViewToSession);
router.post('/share/:sessionId', checkAuth, shareSession);

router.patch('/:sessionId', checkAuth, actionOnSession);
module.exports = router;
