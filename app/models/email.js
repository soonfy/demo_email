var mongoose = require('mongoose')
var EmailSchema = require('../schemas/email')
var Email = mongoose.model('email', EmailSchema)

module.exports = Email
