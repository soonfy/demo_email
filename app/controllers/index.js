var nodemailer = require('nodemailer')
var path = require('path')
var Email = require('../models/email')
var async = require('async')
var schedule = require('node-schedule')
var fs = require('fs')

var count = 0
var timer

exports.index = function(req, res) {

    Email.find({}, {}, function(err, emails){
        var len = emails.length

        res.render('index', {
            title: '首页',
            value: count,
            max: len
        })
    })

}

exports.send = function (req, res) {


    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
        "host": "smtpdm.aliyun.com",
        "port": 25,
        "secureConnection": true, // use SSL
        "auth": {
            "user": 'newsletter@netranking.com.cn', // user name
            "pass": 'Abc123456789'         // password
        }
    });

    var title = req.body.title || '电子杂志'
    var content = req.body.content || '电子杂志'
    if(req.files[0]){
        var file = req.files[0].filename
        var filepath = path.join(__dirname, 'emails', file)


        async.waterfall([
            function (cb) {
                Email.find({}, {}, function(err, emails){
                    cb(null, emails)
                })
            },
            function (emails, cb) {
                var rule = new schedule.RecurrenceRule()
                var times = []
                for(var i = 0; i < 60; i+=2){
                    times.push(i)
                }
                rule.second = times
                count = 0
                var len = emails.length
                timer = schedule.scheduleJob(rule, function () {
                    var url = emails[count].url
                    console.log(url);
                    if(url !== undefined){
                    // setup e-mail data with unicode symbols
                        var mailOptions = {
                            from: '"newsletter" <newsletter@netranking.com.cn>', // sender address
                            to: url, // list of receivers
                            subject: title, // Subject line
                            text: content, // plaintext body
                            html: '<b>' + content + '</b>', // html body
                            attachments: [{
                                filename: file,
                                path: filepath
                            }]
                        };
                        console.log(mailOptions)

                        //send mail with defined transport object
                        //
                        transporter.sendMail(mailOptions, function(error, info){
                            if(error){
                                return console.log(error);
                            }
                            console.log(info);
                            console.log('Message sent: ' + info.response);
                        });
                        count++
                        if(count === len){
                            timer.cancel()
                        }
                    }
                })
            }
        ], function (err, result) {
            
        })
    }else{
         async.waterfall([
            function (cb) {
                Email.find({}, {}, function(err, emails){
                    cb(null, emails)
                })
            },
            function (emails, cb) {
                var rule = new schedule.RecurrenceRule()
                var times = []
                for(var i = 0; i < 60; i+=2){
                    times.push(i)
                }
                rule.second = times
                count = 0
                var len = emails.length
                timer = schedule.scheduleJob(rule, function () {
                    var url = emails[count].url
                    console.log(url);
                    if(url !== undefined){
                    // setup e-mail data with unicode symbols
                        var mailOptions = {
                            from: '"newsletter" <newsletter@netranking.com.cn>', // sender address
                            to: url, // list of receivers
                            subject: title, // Subject line
                            text: content, // plaintext body
                            html: '<b>' + content + '</b>' // html body
                        };
                        console.log(mailOptions)

                        //send mail with defined transport object
                        //
                        transporter.sendMail(mailOptions, function(error, info){
                            if(error){
                                return console.log(error);
                            }
                            console.log(info);
                            console.log(title + ' reply message: ' + info.response);
                        });
                        count++
                        if(count === len){
                            timer.cancel()
                        }
                    }
                })
            }
        ], function (err, result) {
            
        })
    }

    
    res.redirect('/')
}

exports.pause = function (req, res) {
    console.log(timer);
    if(timer){
        console.log('已手动终止。')
        timer.cancel()
    }
        res.redirect('/')
    
}

exports.upload = function (req, res) {
    if(req.files[0]){
        var file = req.files[0].filename
        var filepath = path.join(__dirname, 'emails', file)
        fs.readFile(filepath, 'utf-8', function (err, data) {
            emails = data.indexOf('\r\n') > -1? data.split('\r\n'): data.split('\n')
            emails.map(function (email, index, arr) {
                var metas = email.split(',')
                var title = metas[0]
                var url = metas[1]
                if(url && title){
                    Email.findOne({url: url}, {}, function (err, result) {
                        if(result === null){
                            var _email = new Email({
                                title: title,
                                url: url,
                                createdAt: Date.now()
                            })
                            _email.save(function (err) {
                                if(err){
                                    console.log(err)
                                }
                            })
                        }
                    })
                }
                
            })
        })
        
    }
        res.redirect('/')
    
}
