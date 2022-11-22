var fs = require('fs')
// Node.js的fs module是用來操作實體檔案
// 可以同步或非同步存取檔案系統操作
var express = require('express')
var app = express()
// 呼叫express同時start a server
// and listens on port 3000 for connection
var bodyParser = require('body-parser')
var multer = require('multer')
var uploadConfig = multer({
    dest: './upload'
})
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: false}))
app.get('/api/get', function (req, res){
    console.log('get=>',req.query)
    res.json({name: 'Tommy'})
})

app.post('/api/post', function (req, res){
    console.log('post=>',req.body);
    res.end()
})

app.post('/api/upload', uploadConfig.any() , function(req, res){
    for ( var i = 0; i < req.files.length; i++){
        var file = req.files[i]
        fs.renameSync(file.path, './upload/' + file.originalname)
    }
    res.end()
})

const hostname = '127.0.0.1';
const port = 3000;
app.listen(port, hostname, () => {
    // console.log(`Server running at http://${hostname}:${port}/`);
  });