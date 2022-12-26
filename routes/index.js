const { checkAuth } = require('../middleware/checkAuth');

/**
 * All api routes handles here
 * @author Yousuf Kalim
 */
const router = require('express').Router();

// Parent Routes
router.use('/admins', require('./admins')); // All the user routes
router.use('/users', require('./users')); // All the user routes
router.use('/auth', require('./auth')); // All the auth routes
router.use('/sessions', require('./sessions')); // All Session routes
router.use('/levels', checkAuth, require('./levels')); // All Levels routes
router.use('/playlist', checkAuth, require('./playlist')); // All Levels routes

// Export
module.exports = router;
