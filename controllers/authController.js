const passport = require('passport');

module.exports = {
	login: (req, res, next) => {
		passport.authenticate('local', function (err, user, info) {
			err || !user
				? res.status(400).json({ errors: err })
				: req.logIn(user, function (err) {
						err
							? res.status(400).json({ errors: err })
							: res.status(200).json(user);
				  });
		})(req, res, next);
	},
	getSessionUserId: (req, res) => {
		// console.log(req.session);
		// !req.session.passport.user ? console.log('No session') : console.log('Session');
		!req.session.passport.user
			? res.status(200).json({ status: 'No current sessions.' })
			: res.status(200).json({ userId: req.session.passport.user });
	},
	logout: (req, res) => {
		req.logout();
		res.status(200).json({ status: 'User logged out.' });
	}
};
