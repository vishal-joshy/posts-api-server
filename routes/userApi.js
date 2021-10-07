const express = require('express');
const User = require('../model/userModel');
const passport = require('passport');
const Router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// const debug = (req, res, next) => {
// 	console.log(req.headers.authorization);
// 	next();
// };

Router.post('/user/login', function (req, res, next) {
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
			// generate a signed son web token with the contents of user object and return it in the response
			const userId = user._id.toHexString();
			const token = jwt.sign({ userId }, 'your_jwt_secret');
			return res.json({ token });
		});
	})(req, res);
});

Router.post('/user/sign-up', (req, res, next) => {
	console.log(req.body);
	const newUser = new User(req.body);
	newUser
		.save()
		.then(() => {
			res.json(req.body);
		})
		.catch((err) => next(err));
});

// Router.post(
// 	'/user/login',
// 	passport.authenticate('local', {
// 		successRedirect: '/api/success',
// 		failureRedirect: '/login',
// 		failureFlash: true,
// 	})
// );

Router.get('/user', (req, res, next) => {
	User.find({})
		.then((result) => res.json(result))
		.catch((err) => next(err));
});

Router.get('/success', passport.authenticate('jwt', { session: false }), (req, res) => {
	console.log(req.headers.cookie);
	res.json({ loginStatus: 'success' });
});

module.exports = Router;
