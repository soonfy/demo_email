require('babel-polyfill')

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
exports.insert = function (req, res) {
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
		_article.save(function (err) {
			if(err){
				console.log(err)
			}
		})
	}else{
		let {title, content, attachmentId} = req.body
		let filename = '没有附件'
		let _article = new Article({
			title: title,
			content: content,
			attachmentId: attachmentId,
			filename: filename,
			createdAt: Date.now(),
			updatedAt: Date.now(),
			status: 0
		})
		_article.save(function (err) {
			if(err){
				console.log(err)
			}
			// console.log('article insert...')
		})
	}
	res.redirect('/')
}

//upload emails
exports.upload = function (req, res) {
	if (req.files[0]) {
		let filepath = req.files[0].path
		let data = fs.readFileSync(filepath, 'utf-8')
		let emails = data.indexOf('\r\n') > -1 ? data.split('\r\n') : data.split('\n')
		// console.log(emails.length)
		let results = []
		let adds = []
		emails.map(function(data){
			let metas = data.split(',')
			if(metas[1]){
				let name = metas[0].replace(/^\s+|\s+$/g, '')
				let address = metas[1].replace(/^\s+|\s+$/, '').replace(/[;"；]/g, '').replace(/-/g, '_')
				if(!adds.includes(address)){
					adds.push(address)
					let obj = {
						name: name,
						address: address
					}
					results.push(obj)
				}
			}

		})
		for(let email of results){
			Email.findOne({address: email.address}, {}, function (err, data) {
				if (!err && data === null) {
					let _email = new Email({
						name: email.name,
						address: email.address,
						createdAt: Date.now(),
						updatedAt: Date.now()
					})
					_email.save(function (err) {
						if(err){
							console.log(err)
						}
						console.log('email list insert...')
					})
				}
			})
		}
	}
	res.redirect('/')
}
