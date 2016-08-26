require('babel-register')

var Index = require('../app/controllers/index')
var Article = require('../app/controllers/article')
var Email = require('../app/controllers/email')

// var Export = require('../app/controllers/ept')
// var File = require('../app/controllers/file')

module.exports = function(app) {

    // index
    app.get('/', Index.getIndex)
    app.post('/article/add', Index.add)

    //article
    app.get('/article/list', Article.list)
    // app.get('/article/insert', Article.insert)
    // app.post('/article/insert', Article.insert)
    // app.get('/article/update', Article.update)
    // app.post('/article/update', Article.update)
    // app.delete('/article/list', Article.del)


    // //email
    // app.get('/email/list', Email.list)
    // app.get('/email/insert', Email.insert)
    // app.post('/email/insert', Email.insert)
    // app.get('/email/update', Email.update)
    // app.post('/email/update', Email.update)
    // app.delete('/email/list', Email.del)




    // app.post('/email/send', Index.send)
    // app.post('/email/pause', Index.pause)
    // app.post('/email/upload', Index.upload)

    // app.get('/email/list', Email.list)

    // // Email model
    // app.get('/email/search', Email.search)
    // app.get('/email/add', Email.add)
    // app.get('/email/list', Email.list)
    // app.delete('/email/list', Email.del)
    // app.get('/email/export', Export.down)


    // app.get(/\/download/, File.download)
    // // app.get(/\/([\d]+\.csv)/, File.download)
    // app.get(/\/(.+\.csv)/, File.download)
}
