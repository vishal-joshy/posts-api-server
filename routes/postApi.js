const express = require('express');
const Post = require('../model/postModel');

const Router = express.Router();

// TODO display all posts
Router.get('/posts', (req, res) => {
	Post.find({})
		.then((data) => {
			res.json({ posts: data });
		})
		.catch((err) => {
			console.log(err);
		});
});

// TODO display individual posts
Router.get('/posts/:post_id', (req, res) => {
	res.json({ message: 'GET /posts/post_id to be implemented' });
});

// TODO Add new Post
Router.post('/posts', (req, res) => {
	console.log(req.body)
	const newPost = new Post (req.body);
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
// TODO Edit posts
Router.put('/posts/:post_id', (req, res) =>
	res.json({ message: 'PUT /posts/post_id to be implemented' })
);
// TODO Delete posts
Router.delete('/posts/:post_id', (req, res) =>
	res.json({ message: 'DELETE /posts/post_id to be implemented' })
);
//* General client Route
// TODO Post comment to individual posts
Router.post('/posts/:post_id/comments', (req, res) =>
	res.json({ message: 'GET /posts/post_id to be implemented' })
);

module.exports = Router;