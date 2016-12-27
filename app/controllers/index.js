require('babel-polyfill')

var nodemailer = require('nodemailer')
var path = require('path')

var async = require('async')
var schedule = require('node-schedule')
var fs = require('fs')
var fs_sf = require('file_operator_sf');

var Email = require('../models/email')
var Article = require('../models/article')


/**
 * get index
 */
exports.index = function (req, res) {
  res.render('index', {
    title: '首页',
    message: ''
  })
}

/**
 * insert article
 */
exports.insert = function (req, res) {
  if (req.files[0]) {
    let {title, content, attachmentId} = req.body
    let {filename, path} = req.files[0]
    let _article = new Article({
      title: title,
      content: content,
      attachmentId: attachmentId,
      filename: filename,
      path: path,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      status: 0
    })
    _article.save(function (err) {
      if (err) {
        console.log(err)
      }
    })
  } else {
    let {title, content, attachmentId} = req.body
    let filename = '没有附件'
    let _article = new Article({
      title: title,
      content: content,
      attachmentId: attachmentId,
      filename: filename,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      status: 0
    })
    _article.save(function (err) {
      if (err) {
        console.log(err)
      }
      // console.log('article insert...')
    })
  }
  res.redirect('/')
}

//upload emails
exports.upload = function (req, res) {
  if (req.files[0]) {
    let filepath = req.files[0].path
    let results = []
    if(path.extname(filepath) === '.csv'){
      let data = fs_sf.read(filepath, 'utf-8')
      let emails = data.indexOf('\r\n') > -1 ? data.split('\r\n') : data.split('\n')
      // console.log(emails.length)
      let adds = []
      emails.map(function (data) {
        let metas = data.split(',')
        if (metas[1]) {
          let name = metas[0].replace(/^\s+|\s+$/g, '')
          let address = metas[1].replace(/^\s+|\s+$/, '').replace(/[;"；]/g, '').replace(/-/g, '_')
          if (!adds.includes(address) && address.includes('@')) {
            adds.push(address)
            let obj = {
              name: name,
              address: address
            }
            results.push(obj)
          }
        }
      })
    }else if(path.extname(filepath) === '.xlsx'){
      let data = fs_sf.read(filepath)
      let adds = []
      for(var sheet in data){
        data[sheet].map(arr => {
          if(arr.length === 1){
            arr[1] = arr[0];
          }
          console.log(arr);
          let name = arr[0].trim();
          let address = arr[1].trim().replace(/[;"；]/g, '').replace(/-/g, '_')
          if (!adds.includes(address) && address.includes('@')) {
            adds.push(address)
            let obj = {
              name: name,
              address: address
            }
            results.push(obj)
          }
        })
      }
    }
    console.log(results);
    // for (let email of results) {
    //   Email.findOne({ address: email.address }, {}, function (err, data) {
    //     if (!err && data === null) {
    //       let _email = new Email({
    //         name: email.name,
    //         address: email.address,
    //         createdAt: Date.now(),
    //         updatedAt: Date.now()
    //       })
    //       _email.save(function (err) {
    //         if (err) {
    //           console.log(err)
    //         }
    //         console.log('email list insert...')
    //       })
    //     }
    //   })
    // }
  }
  res.redirect('/')
}
