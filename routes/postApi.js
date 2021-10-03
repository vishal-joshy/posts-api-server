const express = require('express');
const Post = require('../model/postModel');
const Comment = require('../model/commentModel');

const Router = express.Router();

Router.get('/posts', (req, res, next) => {
	Post.find({})
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			return next(err);
		});
});

Router.get('/posts/:post_id', (req, res, next) => {
	console.log(req.params.post_id);
	Post.findById(req.params.post_id)
		.then((data) => {
			console.log(data);
			res.json(data);
		})
		.catch((err) => {
			return next(err);
		});
});

Router.post('/posts', (req, res) => {
	console.log(req.body);
	const newPost = new Post(req.body);
	newPost
		.save()
		.then(() => {
			console.log('populating db ...', newPost);
			res.json({ post: newPost });
		})
		.catch((err) => {
			console.log(err);
		});
});

Router.put('/posts/:post_id', (req, res, next) => {
	console.log(req.params.post_id);
	console.log(req.body);
	Post.findByIdAndUpdate(req.params.post_id, req.body)
		.then(() => {
			Post.findById(req.params.post_id).then((data) => {
				res.send(data);
			});
		})
		.catch((err) => next(err));
});

Router.delete('/posts/:post_id', (req, res, next) => {
	console.log(req.params.post_id);
	Post.findByIdAndRemove(req.params.post_id)
		.then(() => {
			res.json({ status: `${req.params.post_id}` });
		})
		.catch((err) => next(err));
});

//* General client Route
Router.post('/posts/:post_id/comments', (req, res) => {
	console.log(req.params.post_id);
	const newComment = new Comment(req.body);
	Post.findById(req.params.post_id)
		.then((data) => {
			data.comments.push(newComment);
			Post.findByIdAndUpdate(req.params.post_id, data)
				.then(() => {
					Post.findById(req.params.post_id).then((data) => {
						res.json(data);
					});
				})
				.catch((err) => next(err));
		})
		.catch((err) => next(err));
});

module.exports = Router;
