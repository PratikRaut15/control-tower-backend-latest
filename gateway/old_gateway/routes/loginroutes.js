const mysql = require("mysql");
const jwt = require("jsonwebtoken");

/* const connection = mysql.createConnection({
    host: '127.0.0.1',
   // user:'root',
   user:'UserSpeed',
    //password:'',
    password:'el!365X!@',
    database:'elixiatech'
});
connection.connect(function(err){
    if(!err){
        console.log('Database is connected...');
    } else {
        console.log('error connecting database');
    }
}); */

// Mysql pool connection
/* REST.prototype.connectMysql = function() {
    var self = this;
    var pool      =    mysql.createPool({
        connectionLimit : 100,
        waitForConnections : true,
        queueLimit :0,
        host     : 'localhost',
        user     : 'UserSpeed',
        password : 'el!365X!@',
        database : 'elixiatech',
        debug    :  true,
        wait_timeout : 28800,
        connect_timeout :10
    });
    self.configureExpress(pool);
} */

var self = this;
var pool = mysql.createPool({
  connectionLimit: 100,
  waitForConnections: true,
  queueLimit: 0,
  host: "127.0.0.1",
  user: "SpeedUser",
  password: "el!365X!@",
  database: "elixiatech",
  debug: true,
  wait_timeout: 28800,
  connect_timeout: 10
});
//self.configureExpress(pool);

authUser = function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  /*  res.json({
        "code":1000,
        "username":req.body.username,
        "password":password
    }); */
  if (
    typeof username == "" ||
    typeof username == "undefined" ||
    typeof password == "" ||
    typeof password == "undefined"
  ) {
    res.json({
      code: 204,
      message: "Please send username and password"
    });
  } else {
    pool.query(
      'select * from user where username = "' +
        username +
        '" AND isdeleted=0 AND password="' +
        password +
        '"',
      function(error, results, fields) {
        if (error) {
          res.json({
            code: 400,
            message: "error occured",
            error: error
          });
        } else {
          // console.log("The solution is: ", results);
          if (results.length > 0) {
            // dataArray.push(arraynew);
            /*   res.json({ 
                        "code":200, 
                        "data":results, 
                        "success":"login successfull"
                    });   */

            const user = {
              username: results[0]["username"],
              userkey: results[0]["userkey"]
            };
            //console.log("Data is: "+results[0]['username']);
            jwt.sign({ user }, "secretkey", { expiresIn: "" }, (err, token) => {
              res.json({
                code: 200,
                message: "success",
                resultSet: {
                  token: token
                }
              });
            });
          } else {
            res.json({
              code: 204,
              message: "Email and password does not match"
            });
          }
        }
      }
    );
  }
  // connection.end();
  //pool.end();
};

module.exports = {
  authUser
};
