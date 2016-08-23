var Email = require('../models/email')
var json2csv = require('json2csv')
var async = require('async')
var fs = require('fs')
var path = require('path')
var request = require('request')
var mime = require('mime')
var moment =require('moment')



exports.down = function(req, res) {
  

  var filetime = new Date()
  // var fileyear = filetime.getFullYear()
  // var filemonth = filetime.getMonth() + 1 > 9? filetime.getMonth() + 1: '0' + filetime.getMonth() + 1
  // var filedate = filetime.getDate()> 9? filetime.getDate() + 1: '0' + filetime.getDate() + 1
  var fileday =moment(filetime).format('YYYYMMDD') + '_客户列表.csv'
  console.log(fileday)

  var header = '姓名,邮件地址,添加时间' 
  var filename = '客户列表.csv'
  fs.writeFile(path.join(__dirname, 'data', fileday), header, 'utf-8',function (err) {
    if(err){
      console.log(err)
    }
  })
    
  Email
    .find({}, {}, function (err, emails) {
      emails.map(function (email, index, arr) {
        if(email.url){
          var str = '\r\n' + email.title + ',' + email.url + ',' + moment(email.createdAt).format('YYYY-MM-DD')
          console.log(str);
          fs.appendFile(path.join(__dirname, 'data', fileday), str, 'utf-8', function (err) {
            if(err){
              console.log(err);
            }
          })
        }else{
          
        }
      })
    })

}
