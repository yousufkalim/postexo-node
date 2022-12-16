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

const router = require('express').Router();

router.get('/', getAllSessions);
router.get('/:sessionId', getSessionById);
router.post('/addComment/:sessionId', addCommentToSession);
router.post('/like/:sessionId', likeSession);
router.post('/dislike/:sessionId', dislikeSession);
router.post('/view/:sessionId', addViewToSession);
router.post('/share/:sessionId', shareSession);

router.patch('/:sessionId', actionOnSession);
module.exports = router;
