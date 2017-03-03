var mongoose = require('mongoose')
var AEMapSchema = require('../schemas/article_email')
var AEMap = mongoose.model('magazine_AEMap', AEMapSchema)

module.exports = AEMap
