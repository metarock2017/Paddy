const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'mysql'
})



app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));
app.get('/',(req,res) => {
    res.render('index');
})
app.use(bodyParser.json());


app.post('/sign',(req,res) => {
    console.log(req.body);
    let password = req.body.password,
        username = req.body.username;
    connection.query('INSERT INTO test SET ?',{username:username,password:password},(err) => {
        if(err) {
            console.log(err);
        }
    })
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end('sign success');
})


app.post('/login',(req,res) => {
    console.log(req.body);
    let password = req.body.password,
        username = req.body.username;     
    connection.query('SELECT password FROM test WHERE username = ?',username,(err,rows,fields) => {
        if(err) {
            console.log(err);
        }else {
            res.writeHead(200,{'Content-Type':'text/plain'});
            if(!rows[0]) {
                res.end('fail');
            }else{
                res.end('success');
            }
        }
    })
})


//websocket
io.on('connection', function(socket){
    socket.on('chat message',function(data) {
        socket.name = data; 
        io.emit('online',data);
    })
    socket.on('msg',function(data){
        console.log(data);
        var sendMsg = {'name':socket.name,'val':data}
        io.emit('chat',sendMsg);
    });
});




server.listen(8080);