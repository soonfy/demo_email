var express = require('express')
var path = require('path')
var logger = require('morgan');
var mongoose = require('mongoose')
var cookieParser = require('cookie-parser')
var port = 3041
// var hostname = '127.0.0.1'
var app = express()
var bodyParser = require('body-parser');
var multer = require('multer')
var fs = require('fs')

var dburl = 'mongodb://localhost/email'
// var dburl = 'mongodb://soonfy:163@localhost:27017/email'
// mongoose.Promise = global.Promise	//mongoose use promise

mongoose.connect(dburl)

app.set('views', './app/views/pages')
app.set('view engine', 'jade')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.locals.moment = require('moment')

if ('development' === app.get('env')) {
  app.set('showStackError', true)
  app.use(logger('dev'));
  app.locals.pretty = true
  // mongoose.set('debug', true)
}

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let attachmentId = req.body.attachmentId
    let filepath
    if (attachmentId) {
      filepath = path.join(__dirname, '/app/controllers/articles/', attachmentId)
      fs.mkdirSync(filepath)
    } else {
      filepath = path.join(__dirname, '/app/controllers/emails/')
    }
    cb(null, filepath)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage }).any()
app.use(upload)

require('./config/routes')(app)

app.listen(port)

console.log('服务器开始运行 ' + port);
