let Article = require('../models/article')
let Email = require('../models/email')
let AEmap = require('../models/article_email')
let async = require('async')
let schedule = require('node-schedule')
let nodemailer = require('nodemailer')

let trigger = 0

let send = function (num) {

  async.waterfall([
    function (cb) {
      Article.findOne({status: 1}, {}, function (err, article) {
        if(err){
          trigger = 0
          console.log(err)
        }
				if (article !== null) {
					cb(null, article)
				}else{
          trigger = 0
          console.log('articles all sended.');
        }
			})
    },
    function (article, cb) {
      AEmap.find({articleId: article._id}, {}, function (err, maps) {
        if(err){
          trigger = 0
          console.log(err)
        }
        let emailIds = []
        maps.map(function (data) {
          emailIds.push(data.emailId)
        })
        
        cb(null, article, emailIds)
			})
    },
    function (article, emailIds, cb) {
      Email.find({_id: {'$nin': emailIds}}, {}, {limit: num}, function (err, emails) {
        if(err){
          trigger = 0
          console.log(err)
        }
				if (emails.length > 0) {
					cb(null, article, emails)
				}else{
          trigger = 0
          Article.findOne({_id: article._id}, {}, function (err, article) {
            if (err) {
              trigger = 0
              console.log(err)
            }
            if(article === null){

            }else{
              article.status = 0
              article.save(function (err) {
                if(err){
                  trigger = 0
                  console.log(err)
                }
              })
            }
          })
        }
			})
    }
  ], function (err, article, emails) {
    trigger = emails.length
    emails.map(function (email) {
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        "host": "smtpdm.aliyun.com",
        "port": 25,
        "secureConnection": true, // use SSL
        "auth": {
          "user": 'newsletter@netranking.com.cn', // user name
          "pass": 'Abc123456789'         // password
        }
      });

      let {title, content, filename, path} = article
      let address = email.address

      // setup e-mail data with unicode symbols
      let mailOptions = {
        from: '"newsletter" <newsletter@netranking.com.cn>', // sender address
        to: address, // list of receivers
        subject: title, // Subject line
        text: content, // plaintext body
        html: '<b>' + content + '</b>', // html body
        attachments: [{
          filename: filename,
          path: path
        }]
      }
      // console.log(mailOptions)

      //send mail with defined transport object
      //
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          trigger = 0
          return console.log(error)
        }

        let articleId = article._id
        let emailId = email._id
        let _map = new AEmap({
          articleId: articleId,
          emailId: emailId,
          sendTime: Date.now()
        })
        _map.save()
        trigger--
      })
    })
  })
}

let watcher = function (num) {
  let rule = new schedule.RecurrenceRule()
  let times = []
  for(let i = 1; i < 60; i += 2){
    times.push(i)
  }
  rule.second = times
  let timer = schedule.scheduleJob(rule, function () {
    console.log('=>=>=>=>=>=>=>=>=>=>=>=>=>=>=>')
    console.log(new Date())
    console.log('watching...')
    console.log(trigger)  //trigger不等于0就是出错了。
    if(trigger === 0){
      trigger = 10
      console.log('email sending...')
      send(num)
    }
  })
}

//每次发送邮件数量
watcher(10)
