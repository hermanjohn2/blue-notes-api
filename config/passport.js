const User = require('../models').User,
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user);
	});
});

passport.use(
	new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
		// Match Email
		User.findOne({ email: email })
			.then(user => {
				!user ? done(null, false, { message: 'Invalid email.' }) : null;

				user.comparePassword(password, (err, isMatch) => {
					if (err) throw err;

					isMatch
						? done(null, user)
						: done(null, false, { message: 'Invalid password.' });
				});
			})
			.catch(err => done(null, false, { message: err }));
	})
);

module.exports = passport;
