var Article = require('../models/article')
var async = require('async')


exports.search = function(req, res) {
		var q = req.query.title
		var url = req.query.url
		if (q) {
				Article
						.fetch(q, function(err, articles) {
								if (err) {
										console.log(err);
								}

								res.render('articlelist', {
										title: '杂志列表',
										articles: articles
								})
						})
		} else if(url) {
				Article
						.findByUrl(url, function(err, articles) {
								if (err) {
										console.log(err);
								}

								res.render('articlelist', {
										title: '杂志列表',
										articles: articles
								})
						})
		}else {
				Article
						.fetch(null, function(err, articles) {
								if (err) {
										console.log(err);
								}

								res.render('articlelist', {
										title: '杂志列表',
										articles: articles
								})
						})
		}
}

exports.list = function(req, res) {
		Article
				.fetch(null, function(err, articles) {
						if (err) {
								console.log(err);
						}
						
						res.render('articlelist', {
								title: '杂志列表',
								articles: articles
						})
				})
}

exports.del = function(req, res) {
		var id = req.query.id.split(',')

		if (id) {
				for (var i=0; i<id.length; i++) {
						async.series([
								function(cb) {
										Article
												.remove({_id: id[i]}, function(err, article) {
														if (err) {
																cb('remove article error')
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
