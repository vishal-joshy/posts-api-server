const express = require('express');

const postController = require('../controller/postController');
const commentController = require('../controller/commentController');

const Router = express.Router();

Router.get('/posts', postController.post_list);
Router.get('/posts/:post_id', postController.post_detail);

Router.post('/posts', postController.post_create);
Router.put('/posts/:post_id', postController.post_update);
Router.delete('/posts/:post_id', postController.post_delete);

//* General client Route
Router.post('/posts/:post_id/comments', commentController.comment_create);

module.exports = Router;
