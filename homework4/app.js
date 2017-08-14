const express = require('express');
const app = express();
const mysql = require('mysql');
const form = require('formidable');
const path = require('path');
const upload = require('multer')({
     dest: 'uploads/'
});
const fs = require('fs');
const bodyParser = require('body-parser');

app.set('view engine','ejs');
app.set('Content-Type','text/plain');

app.use(express.static('./public'));

app.get('/',(req,res) => {
    res.render('index');
    res.end();
})



const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Paddy',
    database: 'mysql',
    port: 3307
})
connection.connect();

app.post('/uploads',upload.single('file'),(req,res,next) => {
    form.uploadDir = './uploads';    
    var oldName = __dirname + '/uploads/' + req.file.filename;
    var newName = __dirname + '/uploads/' + req.file.originalname;
    console.log(oldName);
    fs.rename(oldName,newName,() => {
        console.log('success');
        connection.query('INSERT INTO img SET image = ?',newName,function(err,results, fields) {
            console.log('success');
        })
        connection.end();
    })
    // res.writeHead(200,{'Content-Type':'text/plain'});
    // res.send('success');
})

app.listen(8080,'127.0.0.1');