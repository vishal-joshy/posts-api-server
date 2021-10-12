const User = require('../model/userModel');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');
const bcrypt = require('bcrypt')

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

const user_signup_post = async (req, res, next) => {
	const hash = await bcrypt.hash(req.body.password, 10)
	const compare = await bcrypt.compare(req.body.password,hash);
	console.log(compare);
	const newUser = new User({
		username:req.body.username,
		password:hash
	})
	newUser
		.save()
		.then(() => {
			res.json({signUpStatus: 'success' });
		})
		.catch((err) => next(err));
};

module.exports = { user_login_post, user_signup_post };
