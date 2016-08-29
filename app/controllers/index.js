var nodemailer = require('nodemailer')
var path = require('path')

var async = require('async')
var schedule = require('node-schedule')
var fs = require('fs')

var Email = require('../models/email')
var Article = require('../models/article')


/**
 * get index
 */
exports.index = function (req, res) {
	res.render('index', {
		title: '首页',
		message: ''
	})
}

/**
 * insert article
 */
exports.insert = function async(req, res) {
	if(req.files[0]){
		let {title, content, attachmentId} = req.body
		let {filename, path} = req.files[0]
		let _article = new Article({
			title: title,
			content: content,
			attachmentId: attachmentId,
			filename: filename,
			path: path,
			createdAt: Date.now(),
			updatedAt: Date.now(),
			status: 0
		})
		_article.save()
	}
	res.redirect('/')
}

//upload emails
exports.upload = function (req, res) {
	if (req.files[0]) {
		var filepath = req.files[0].path
		fs.readFile(filepath, 'utf-8', function (err, data) {
			let emails = data.indexOf('\r\n') > -1 ? data.split('\r\n') : data.split('\n')
			emails.map(function (email, index, arr) {
				var metas = email.split(',')
				var name = metas[0]
				var address = metas[1]
				if (address && name) {
					Email.findOne({ address: address }, {}, function (err, result) {
						if (result === null) {
							var _email = new Email({
								name: name,
								address: address,
								createdAt: Date.now(),
								updatedAt: Date.now()
							})
							_email.save(function (err) {
								if (err) {
									console.log(err)
								}
							})
						}
					})
				}

			})
		})

	}
	res.redirect('/')

}
