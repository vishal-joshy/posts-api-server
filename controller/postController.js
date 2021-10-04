const Post = require('../model/postModel');

const post_list = (req, res, next) => {
	Post.find({})
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			return next(err);
		});
};
const post_detail = (req, res, next) => {
	console.log(req.params.post_id);
	Post.findById(req.params.post_id)
		.then((data) => {
			console.log(data);
			res.json(data);
		})
		.catch((err) => {
			return next(err);
		});
};

const post_create = (req, res, next) => {
	console.log(req.body);
	const newPost = new Post(req.body);
	newPost
		.save()
		.then(() => {
			console.log('populating db ...', newPost);
			res.json({ post: newPost });
		})
		.catch((err) => next(err));
};
const post_update = (req, res, next) => {
	console.log(req.params.post_id);
	console.log(req.body);
	Post.findByIdAndUpdate(req.params.post_id, req.body)
		.then(() => {
			Post.findById(req.params.post_id).then((data) => {
				res.send(data);
			});
		})
		.catch((err) => next(err));
};
const post_delete = (req, res, next) => {
	console.log(req.params.post_id);
	Post.findByIdAndRemove(req.params.post_id)
		.then(() => {
			res.json({ status: `${req.params.post_id}` });
		})
		.catch((err) => next(err));
};

module.exports = { post_list, post_detail, post_create, post_update, post_delete };
