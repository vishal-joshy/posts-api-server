const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
	title: { type: String, required: true },
	subheading: { type: String, required: true },
	content: { type: String, required: true },
	date: { type: String },
	comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

module.exports = mongoose.model('Post', postSchema);
