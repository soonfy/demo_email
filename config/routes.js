var Index = require('../app/controllers/index')
var Email = require('../app/controllers/email')
var Export = require('../app/controllers/ept')
var File = require('../app/controllers/file')

module.exports = function(app) {

    // index
    app.get('/', Index.index)
    app.post('/email/send', Index.send)
    app.post('/email/pause', Index.pause)
    app.post('/email/upload', Index.upload)

    // Email model
    app.get('/email/search', Email.search)
    app.get('/email/add', Email.add)
    app.get('/email/list', Email.list)
    app.delete('/email/list', Email.del)
    app.get('/email/export', Export.down)


    app.get(/\/download/, File.download)
    // app.get(/\/([\d]+\.csv)/, File.download)
    app.get(/\/(.+\.csv)/, File.download)
}
