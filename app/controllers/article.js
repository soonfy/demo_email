let Article = require('../models/article')
let Email = require('../models/email')



/**
 * get article list
 */
exports.list = function async (req, res) {
	Article
		.findByTitle(null, function (err, articles) {
			if(!err){
				articles.map(art => {
					Article
						.count(art.title, function (err, article_count) {
							console.log(article_count)
							
						})
				})
				
				res.render('articlelist', {
					title: '杂志列表',
					articles: articles,
					article_count: article_count
				})
			}
		})

	// let articles = Article.findByTitle()
	
	// res.render('articlelist', {
	// 	title: '杂志列表',
	// 	articles: articles
	// })
	// Article
	// 	.findByTitle(null, function (err, articles) {
	// 		if (err) {
	// 			console.log(err);
	// 		}
	// 		res.render('articlelist', {
	// 			title: '杂志列表',
	// 			articles: articles
	// 		})
	// 	})
	// res.redirect('/')
}

/**
 * get search article
 */
exports.search = function (req, res) {
	var q = req.query.title
	var url = req.query.url
	if (q) {
		Article
			.fetch(q, function (err, articles) {
				if (err) {
					console.log(err);
				}

				res.render('articlelist', {
					title: '杂志列表',
					articles: articles
				})
			})
	} else if (url) {
		Article
			.findByUrl(url, function (err, articles) {
				if (err) {
					console.log(err);
				}

				res.render('articlelist', {
					title: '杂志列表',
					articles: articles
				})
			})
	} else {
		Article
			.fetch(null, function (err, articles) {
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

/**
 * get insert article
 */
exports.getInsert = function (req, res) {
	
}

/**
 * post insert article
 */
exports.getInsert = function (req, res) {
	
}

/**
 * get update article
 */
exports.getUpdate = function (req, res) {
	
}

/**
 * post update article
 */
exports.getUpdate = function (req, res) {
	
}

/**
 * delete article
 */
exports.del = function (req, res) {
	var id = req.query.id.split(',')

	if (id) {
		for (var i = 0; i < id.length; i++) {
			async.series([
				function (cb) {
					Article
						.remove({ _id: id[i] }, function (err, article) {
							if (err) {
								cb('remove article error')
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
