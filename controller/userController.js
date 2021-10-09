const User = require('../model/userModel');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');

const user_login_post = function (req, res, next) {
	passport.authenticate('local', { session: false }, (err, user, info) => {
		if (err || !user) {
			return res.status(400).json({
				message: 'Something is not right',
				user: user,
			});
		}
		req.login(user, { session: false }, (err) => {
			if (err) {
				res.send(err);
			}
			const userId = user._id.toHexString();
			const token = jwt.sign({ userId }, config.jwt.secret);
			return res.json({ token });
		});
	})(req, res);
};

const user_signup_post = (req, res, next) => {
	const newUser = new User(req.body);
	newUser
		.save()
		.then(() => {
			res.json(req.body);
		})
		.catch((err) => next(err));
};

module.exports = { user_login_post, user_signup_post };
