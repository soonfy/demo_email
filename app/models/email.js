var mongoose = require('mongoose')
var EmailSchema = require('../schemas/email')
var Email = mongoose.model('magazine_email', EmailSchema)

module.exports = Email
