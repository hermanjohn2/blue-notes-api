const router = require('express').Router(),
	usersController = require('../../controllers/userController');

// ROUTE: /api/users
router.route('/').get(usersController.findAll);

// ROUTE: /api/users/:id
router.route('/:id').get(usersController.findById).delete(usersController.remove);

// ROUTE: /api/users/register
router.route('/register').post(usersController.create);

// ROUTE: /api/users/update-password
router.route('/update-password').put(usersController.updatePassword);

module.exports = router;
