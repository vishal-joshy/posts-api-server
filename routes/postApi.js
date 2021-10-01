const express = require('express');
const dummyData = require('../dummyData');

const Router = express.Router();

// TODO display all posts
Router.get('/posts', (req, res) => res.json(dummyData));

// TODO display individual posts
Router.get('/posts/:post_id', (req, res) => {
	res.json({ message: 'GET /posts/post_id to be implemented' });
});

// TODO Add new Post
Router.post('/posts', (req, res) => {
	console.log(req.body);
	res.json(req.body);
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
