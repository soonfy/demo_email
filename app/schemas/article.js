var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var ArticleSchema = new Schema({
	title: {
		type: String,							//标题
		index: true
	},
	content: String,						//内容
	attachmentId: Number,				//附件id，文件夹名称
	filename: String,						//附件名称
	path: String,								//附件路径
	createdAt: Date,
	updatedAt: Date,
	status: {
		type: Number, // 0, closed; 1. sending; 2, deleted	//杂志状态
		index: true
	}
})

module.exports = ArticleSchema
