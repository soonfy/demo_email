let Article = require('../models/article')
let Email = require('../models/email')
let AEmap = require('../models/article_email')
let async = require('async')
let Send = require('./send')



/**
 * get article list
 */
exports.list = function (req, res) {
	async.parallel([
		//杂志表查找杂志
		function (cb) {
			Article.find({status: {'$in': [0, 1]}}, {}, function (err, articles) {
				if (!err) {
					cb(null, articles)
				}
			})
		},
		//对应表查找对应关系
		function (cb) {
			AEmap.find({}, {}, function (err, maps) {
				if (!err) {
					let results = []
					let articles = []
					maps.map(function (am) {
						let articleId = am.articleId
						if(articles.includes(articleId)){
							return results.map(function (data) {
								if(data.articleId === articleId){
									data.count++
								}
							})
						}else{
							let obj = {}
							obj.articleId = articleId
							obj.count = 1
							results.push(obj)
							articles.push(articleId)
						}
					})
					cb(null, results)
				}
			})
		},
		//邮件表查找邮件总数量
		function (cb) {
			Email.find({}, {}, function (err, emails) {
				if (!err) {
					cb(null, emails.length)
				}
			})
		}
	], function (err, results) {
		if (!err) {
			// console.log(results)
			let articles = results[0]
			let maps = results[1]
			let len = results[2]
			let article_result = articles.map(function (article, index, arr) {
				article.len = len
				article.count = 0
				maps.forEach(function(data) {
					if(data.articleId == article._id){
						article.count = data.count
					}
				})
				return article
			})
			// console.log(article_result)
			// console.log(articles)
			res.render('articlelist', {
				title: '杂志列表',
				articles: articles
			})
		}
	})
}

/**
 * get search article
 */
exports.search = function (req, res) {
	let title = req.query.title
	async.parallel([
		//杂志表查找杂志
		function (cb) {
			Article.find({status: {'$in': [0, 1]}, title: title}, {}, function (err, articles) {
				if (!err) {
					cb(null, articles)
				}
			})
		},
		//对应表查找对应关系
		function (cb) {
			AEmap.find({}, {}, function (err, maps) {
				if (!err) {
					let results = []
					let articles = []
					maps.map(function (am) {
						let articleId = am.articleId
						if(articles.includes(articleId)){
							return results.map(function (data) {
								if(data.articleId === articleId){
									data.count++
								}
							})
						}else{
							let obj = {}
							obj.articleId = articleId
							obj.count = 1
							results.push(obj)
							articles.push(articleId)
						}
					})
					cb(null, results)
				}
			})
		},
		//邮件表查找邮件总数量
		function (cb) {
			Email.find({}, {}, function (err, emails) {
				if (!err) {
					cb(null, emails.length)
				}
			})
		}
	], function (err, results) {
		if (!err) {
			// console.log(results)
			let articles = results[0]
			let maps = results[1]
			let len = results[2]
			let article_result = articles.map(function (article, index, arr) {
				article.len = len
				article.count = 0
				maps.forEach(function(data) {
					if(data.articleId == article._id){
						article.count = data.count
					}
				})
				return article
			})
			// console.log(article_result)
			// console.log(articles)
			res.render('articlelist', {
				title: '杂志列表',
				articles: articles
			})
		}
	})
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
	let _id = req.query._id
	Article.findOne({_id: _id}, {}, function (err, article) {
		if(article !== null){
			res.render('articleupdate', {
				title: '修改杂志',
				article: article,
				message: ''
			})
		}
	})
}

/**
 * post update article
 */
exports.postUpdate = function (req, res) {
	let {_id, title, content, attachmentId} = req.body
	Article.findOne({_id: _id}, {}, function (err, article) {
		if (article === null) {

		}else{
			article.title = title
			article.content = content
			article.updatedAt = Date.now()
			if(req.files[0]){
				let {filename, path} = req.files[0]
				article.attachmentId = attachmentId
				article.filename = filename
				article.path = path
			}
			article.save(function (err) {
				if(err){
					console.log(err)
				}
				console.log('article update...')
			})
		}
	})
	res.redirect('/article/list')
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
					Article.findOne({_id: id}, {}, function (err, article) {
						if (article === null) {

						}else{
							article.status = 2
							article.save(function (err) {
								if(err){
									console.log(err)
								}
							})
						}
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

/**
 * send article
 */
exports.send = function (req, res) {
	var _id = req.body._id

	Article.findOne({_id: _id}, {}, function (err, article) {
		if (article === null) {
			console.log('article is wrong...')
		}else{
			article.status = 1
			article.save(function (err) {
				if(err){
					console.log(err)
				}
				console.log('article send...')
				Send.sender()
			})
		}
	})
	res.send()
}

/**
 * send article
 */
exports.pause = function (req, res) {
	var _id = req.body._id

	Article.findOne({_id: _id}, {}, function (err, article) {
		if (article === null) {
			console.log('article is wrong...')
		}else{
			article.status = 0
			article.save(function (err) {
				if(err){
					console.log(err)
				}
				console.log('article pause...')
			})
		}
	})
	res.send()
}
