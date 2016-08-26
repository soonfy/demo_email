var mongoose = require('mongoose')
var AEMapSchema = require('../schemas/article_email')
var AEMap = mongoose.model('AEMap', AEMapSchema)

module.exports = AEMap
