const router = require('express').Router(),
	userRoutes = require('./users');

router.use('/api', userRoutes);

module.exports = router;
