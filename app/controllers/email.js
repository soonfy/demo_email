var Email = require('../models/email')
var async = require('async')

exports.add = function (req, res) {
	var title = req.query.title,
		url = req.query.url
	if (url) {
		Email.findOne({ url: url }, {}, function (err, email) {
			if (email === null) {
				var _email = new Email({
					title: title,
					url: url,
					createdAt: Date.now()
				})
				_email.save(function (err) {
					if (err) {
						console.log(err)
					} else {

					}
				})
			}
		})
	}
}

exports.search = function (req, res) {
	var address = req.query.address || null
	Email
		.findByAddress(address, function (err, emails) {
			if (err) {
				console.log(err);
			}

			res.render('emaillist', {
				title: '邮件列表',
				emails: emails
			})
		})
}

exports.list = function (req, res) {
	Email
		.findByAddress(null, function (err, emails) {
			if (err) {
				console.log(err);
			}

			res.render('emaillist', {
				title: '邮件列表',
				emails: emails
			})
		})
}

exports.getInsert = function (req, res) {
	res.render('emailinsert', {
		title: '添加邮件',
		message: ''
	})
}

exports.postInsert = function (req, res) {
	let {address, name} = req.body
	console.log(address)
	console.log(name)
	if(address){
		Email.findOne({address: address}, {}, function (err, email) {
			if (email === null) {
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
	res.redirect('/email/list')
}

exports.getUpdate = function (req, res) {
	let email = req.query
	res.render('emailupdate', {
		title: '修改邮件',
		email: email,
		message: ''
	})
}

exports.postUpdate = function (req, res) {
	let {_id, address, name} = req.body
	console.log(_id)
	console.log(address)
	console.log(name)
	if(address){
		Email.findOne({_id: _id}, {}, function (err, email) {
			console.log(email);
			if (email === null) {

			}else{
				email.name = name
				email.address = address
				email.updatedAt = Date.now()
				email.save(function (err) {
					if(err){
						console.log(err)
					}
				})
			}
		})
	}
	res.redirect('/email/list')
}

exports.del = function (req, res) {
	var id = req.query.id.split(',')

	if (id) {
		for (var i = 0; i < id.length; i++) {
			async.series([
				function (cb) {
					Email
						.remove({ _id: id[i] }, function (err, email) {
							if (err) {
								cb('remove email error')
							}
							cb(null)
						})
				}
			],
				function (err, results) {
					if (err) {
						console.log(err);
					}
				})
		}
	}
	res.send()
}
