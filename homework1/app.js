const express = require('express');
const url = require('url');
const app = express();

app.use(express.static(__dirname+'/public'));
app.set('view engine','ejs');

app.get('/',(req,res) => {
    res.render('start');
})
app.get('/game',(req,res) => {
    res.render('game');
})


app.listen(3000);