const router = require('express').Router(),
	authController = require('../../controllers/authController');

// ROUTE: /api/auth/login
router.route('/login').post(authController.login);

// ROUTE: /api/auth/session
router.route('/session').get(authController.getSessionUserId);

// ROUTE: /api/auth/logout
router.route('/logout').post(authController.logout);

module.exports = router;
