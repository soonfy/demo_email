var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var ArticleSchema = new Schema({
	title: String,
	content: String,
	attachmentId: Number,
	attachment: String,
	createdAt: Date,
	updatedAt: Date,
	status: Number // 0, closed; 1. sending; 2, deleted
})

ArticleSchema.statics = {
	findByTitle: function (title, cb) {
		if (title) {
			return this
				.find({ 'title': title, status: {'$in': [0, 1]} })
				.sort({ 'title': 1 })
				.exec(cb)
		} else {
			return this
				.find({status: {'$in': [0, 1]}})
				.sort({ 'title': 1 })
				.exec(cb)
		}
	}
}

module.exports = ArticleSchema
