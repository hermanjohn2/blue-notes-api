const mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt'),
	saltRounds = 10;

const UserSchema = new Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	createdAt: { type: Date, default: Date.now() },
	updatedAt: { type: Date, default: Date.now() }
});

UserSchema.pre('save', function (next) {
	const user = this;

	// only hash the password if it is new or has been modified
	if (!user.isModified('password')) return next();

	// generate a salt
	bcrypt.genSalt(saltRounds, function (err, salt) {
		if (err) return next(err);

		// hash password using our new salt
		bcrypt.hash(user.password, salt, function (err, hash) {
			if (err) return next(err);

			// override entered password with the hashed one
			user.password = hash;
			next();
		});
	});
});

UserSchema.methods.comparePassword = function (enteredPassword, cb) {
	bcrypt.compare(enteredPassword, this.password, function (err, result) {
		if (err) return cb(err);
		cb(null, result);
	});
};

module.exports = mongoose.model('user', UserSchema);
