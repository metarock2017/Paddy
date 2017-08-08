var express = require('express');  
var http = require('http');  
var path = require('path');  
var app = express();  
app.set('port', 8080);  
app.use(express.static(path.join(__dirname, '../homework2')));  
http.createServer(app).listen(app.get('port'));  
