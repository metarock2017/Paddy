const express = require('express');
const app = express();
const mysql = require('mysql');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const formidable = require('formidable');

// app.use(bodyParser.json({limit: "50mb"}));

app.use(bodyParser.json({
    keepExtensions: true,
    limit: '500mb'
}))

app.set('view engine','ejs');
app.use(express.static('./public'));
app.get('/',(req,res) => {
    res.render('index');
    res.end();
})


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mysql',
    port: 3306
})
connection.connect(function(){
    console.log('success');
});

var x = 0;
app.post('/uploads',(req,res) => {
    x++;
    var data = req.body;
    if(x === 1){
        connection.query('INSERT INTO img SET ?',{name: data.imgName,url: data.infor})
    }else {
        connection.query('SELECT url FROM img WHERE name = ?',data.imgName,(err,rows,fields) => {
                connection.query('UPDATE img SET url = concat(url,?) WHERE name = ?',[data.infor,data.imgName])
        })
    }
    res.writeHead(200,{'Content-Type':'text/plain,charset=utf8'});
    res.end('success');
})


app.listen(8080,'127.0.0.1');