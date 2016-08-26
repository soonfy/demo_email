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
    findByTitle: function(title, cb) {
        return this
            .findOne({title: title})
            .exec(cb)
    },
    findByUrl: function(q, cb) {
        if (q) {
            return this
                .find({'url': q})
                .sort({'title': 1})
                .exec(cb)
        } else {
            return this
                .find({})
                .sort({'title': 1})
                .exec(cb)
        }   
    },
    fetch: function(q, cb) {
        if (q) {
            return this
                .find({'title': q})
                .sort({'title': 1})
                .exec(cb)
        } else {
            return this
                .find({})
                .sort({'title': 1})
                .exec(cb)
        }   
    }
}

module.exports = ArticleSchema
