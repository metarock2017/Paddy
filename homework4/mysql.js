const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Paddy',
    database: 'paddy'
})
// connection.connect(function() {
//     console.log('success');
// })

module.exports = connection;