const mysql = require('mysql');

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user:'root',
//     password:'',
//     database:'ct'
// });

const connection      =    mysql.createPool({
    connectionLimit : 100,
    waitForConnections : true,
    queueLimit :0,
    host     : '127.0.0.1',
    user     : 'SpeedUser',
    password : 'el!365X!@',
    database : 'dev_controltower',
    debug    :  true,
    wait_timeout : 28800,
    connect_timeout :10
}); 






module.exports = {
    connection
}