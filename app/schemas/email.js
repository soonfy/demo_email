var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var EmailSchema = new Schema({
	_id: {
		type: String,
		index: true
		},
	name: String,
	createdAt: Date
})

EmailSchema.statics = {
	count: function (cb) {
		return this
			.find({})
			.count()
			.exec(cb)
	},
	findByTitle: function (title, cb) {
		return this
			.findOne({ title: title })
			.exec(cb)
	},
	findByUrl: function (q, cb) {
		if (q) {
			return this
				.find({ 'url': q })
				.sort({ 'title': 1 })
				.exec(cb)
		} else {
			return this
				.find({})
				.sort({ 'title': 1 })
				.exec(cb)
		}
	},
	fetch: function (q, cb) {
		if (q) {
			return this
				.find({ 'title': q })
				.sort({ 'title': 1 })
				.exec(cb)
		} else {
			return this
				.find({})
				.sort({ 'title': 1 })
				.exec(cb)
		}
	}
}

module.exports = EmailSchema
