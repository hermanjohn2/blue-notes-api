const db = require('../models'),
	bcrypt = require('bcrypt');

module.exports = {
	findAll: (req, res) => {
		db.User.find(req.query)
			.then(data => res.json(data))
			.catch(err => res.status(422).json(err));
	},
	findById: (req, res) => {
		db.User.findById(req.params.id)
			.then(data =>
				res.json({
					id: data._id
				})
			)
			.catch(err => res.status(422).json(err));
	},
	create: (req, res) => {
		db.User.create(req.body)
			.then(data => res.json(data))
			.catch(err => res.status(422).json(err));
	},
	remove: (req, res) => {
		db.User.findByIdAndDelete(req.params.id)
			.then(data => data.remove())
			.then(response => res.json(response))
			.catch(err => res.status(422).json(err));
	},
	updatePassword: (req, res) => {
		const newPassword = req.body.password;
		const hashedPassword = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10), null);

		db.User.updateOne({ email: req.body.email }, { password: hashedPassword, updatedAt: Date.now() })
			.then(data => res.json(data))
			.catch(err => console.log(err));
	}
};
