const Comment = require('../model/commentModel');

const comment_create = (req, res, next) => {
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
};

module.exports = { comment_create };
