var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var EmailSchema = new Schema({
	address: {						//邮件地址
		type: String,
		index: true
		},
	name: String,					//名称
	createdAt: Date,
	updatedAt: Date
})


EmailSchema.statics = {
	findByAddress: function (address, cb) {
		if (address) {
			return this
				.find({ 'address': address })
				.sort({ 'address': 1 })
				.exec(cb)
		} else {
			return this
				.find({})
				.sort({ 'updatedAt': -1 })
				.exec(cb)
		}
	}
}

module.exports = EmailSchema
