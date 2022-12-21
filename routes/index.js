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
router.use('/sessions', checkAuth, require('./sessions')); // All Session routes
router.use('/levels', checkAuth, require('./levels'));

// Export
module.exports = router;
