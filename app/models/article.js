var mongoose = require('mongoose')
var ArticleSchema = require('../schemas/article')
var Article = mongoose.model('magazine_article', ArticleSchema)

module.exports = Article
