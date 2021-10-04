const express = require('express');
const User = require('../model/userModel');
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

Router.get('/user/login', (req, res, next) => {
	User.find({})
		.then((response) => {
			res.json(response);
		})
		.catch((err) => next(err));
});

module.exports = Router;
