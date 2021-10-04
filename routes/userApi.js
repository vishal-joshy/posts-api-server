const express = require('express');
const User = require('../model/userModel');
const passport = require('passport');
const Router = express.Router();

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

Router.post(
	'/user/login',
	passport.authenticate('local', {
		successRedirect: '/api/user',
		failureRedirect: '/login',
		failureFlash: true,
	})
);

Router.get('/user', (req, res, next) => {
	User.find({})
		.then((result) => res.json(result))
		.catch((err) => next(err));
});

Router.get('/user', (req, res) => {
	res.json({ loginStatus: 'success' });
});


module.exports = Router;
