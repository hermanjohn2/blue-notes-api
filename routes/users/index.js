const router = require('express').Router(),
	userRoutes = require('./users'),
	authRoutes = require('./auth');

router.use('/users', userRoutes);
router.use('/auth', authRoutes);

module.exports = router;
