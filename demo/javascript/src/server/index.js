const request = require('request')
const express = require('express')
const bodyParser = require('body-parser')
const ipAndProt = 'http://test01.orientwalt.cn:1317'

const app = express()
app.use(bodyParser.json({ limit: '1mb' }))
app.use(bodyParser.urlencoded({ extended: true }))

// 跨域处理
app.all('*', (_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  next()
})

app.get('/', (req, res) => {
  res.send('htdf node server!')
})

// 获取账户信息
app.get('/auth/accounts', (req, res) => {
  console.log('req.query:', req.query)
  request({
    url: ipAndProt + '/auth/accounts/' +  req.query.from,
    method: 'get'
  }, function (err, response, body) {
    res.json(body)
  })
})
// 广播交易
app.post('/hs/broadcast', (req, res) => {
  console.log('req.body:', req.body)
  request({
    url: ipAndProt + '/hs/broadcast',
    method: 'post',
    json: true,
    body: { tx: req.body.tx }
  }, function (err, response, body) {
    res.json(body)
  })
})

// request({
// url: ipAndProt + '/hs/createWithtest',
// method: 'post',
// body: JSON.parse(params),
// json: true
// }, (err, res, body) => {
// console.log(body)
// let resJsonStr = atob(body)
// // console.log(resJsonStr)
// let resJsonBuffer = Buffer.from(resJsonStr)
// console.log(resJsonBuffer)
// const hax = ethereumjsUtil1.sha256(resJsonBuffer)
// let signB = ethereumjsUtil1.ecsign(hax, g_privateKey)
// let sign64 = Buffer.concat([signB.r, signB.s])
// bytetostr = btoa(uint8ToStr(sign64))
// })

console.log('server listen on port 3000')
app.listen(3000)
