var Email = require('../models/email')
var async = require('async')

exports.add = function(req, res){
		var title = req.query.title,
				url = req.query.url
	 if(url){
     Email.findOne({url: url}, {}, function (err, email) {
       if(email === null){
         var _email = new Email({
           title: title,
           url: url,
           createdAt: Date.now()
         })
         _email.save(function (err) {
           if(err){
             console.log(err)
           }else{
						 
					 }
         })
       }
     })
   }
}

exports.search = function(req, res) {
		var q = req.query.title
		var url = req.query.url
		if (q) {
				Email
						.fetch(q, function(err, emails) {
								if (err) {
										console.log(err);
								}

								res.render('emaillist', {
										title: '邮件列表',
										emails: emails
								})
						})
		} else if(url) {
				Email
						.findByUrl(url, function(err, emails) {
								if (err) {
										console.log(err);
								}

								res.render('emaillist', {
										title: '邮件列表',
										emails: emails
								})
						})
		}else {
				Email
						.fetch(null, function(err, emails) {
								if (err) {
										console.log(err);
								}

								res.render('emaillist', {
										title: '邮件列表',
										emails: emails
								})
						})
		}
}

exports.list = function(req, res) {
		Email
				.fetch(null, function(err, emails) {
						if (err) {
								console.log(err);
						}
						
						res.render('emaillist', {
								title: '邮件列表',
								emails: emails
						})
				})
}

exports.del = function(req, res) {
		var id = req.query.id.split(',')

		if (id) {
				for (var i=0; i<id.length; i++) {
						async.series([
								function(cb) {
										Email
												.remove({_id: id[i]}, function(err, email) {
														if (err) {
																cb('remove email error')
														}
														cb(null)
												})
								}
						],
						function(err, results) {
								if (err) {
										console.log(err);
								}
						})
				}
		}
		res.send()
}
