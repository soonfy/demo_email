var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var EmailSchema = new Schema({
    title: String,
    url: String,
    phone: String,
    category: String,
    createdAt: Date
})

EmailSchema.statics = {
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

module.exports = EmailSchema
