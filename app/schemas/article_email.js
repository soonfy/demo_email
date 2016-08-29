var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var AEMapSchema = new Schema({
	articleId: {
		type: String,
		index: true
	},
	emailId: String,
	sendTime: Date
})

module.exports = AEMapSchema
