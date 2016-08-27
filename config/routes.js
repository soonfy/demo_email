require('babel-register')

require('../app/controllers/send')

let Index = require('../app/controllers/index')
let Article = require('../app/controllers/article')
let Email = require('../app/controllers/email')

// let Export = require('../app/controllers/ept')
// let File = require('../app/controllers/file')

module.exports = function (app) {

	// index
	app.get('/', Index.index)
	app.post('/article/insert', Index.insert)

	//article
	app.get('/article/list', Article.list)
	app.get('/article/search', Article.search)
	// app.get('/article/insert', Article.getInsert)
	// app.post('/article/insert', Article.postInsert)
	app.get('/article/update', Article.getUpdate)
	app.post('/article/update', Article.postUpdate)
	app.delete('/article/list', Article.del)


	//email
	app.get('/email/list', Email.list)
	app.get('/email/search', Email.search)
	app.get('/email/insert', Email.getInsert)
	app.post('/email/insert', Email.postInsert)
	app.get('/email/update', Email.getUpdate)
	app.post('/email/update', Email.postUpdate)
	app.delete('/email/list', Email.del)

	//send or pause
	app.post('/article/send', Article.send)
	app.post('/article/pause', Article.pause)

	//upload emails
	app.post('/email/upload', Index.upload)

	// app.get(/\/download/, File.download)
	// // app.get(/\/([\d]+\.csv)/, File.download)
	// app.get(/\/(.+\.csv)/, File.download)
}
