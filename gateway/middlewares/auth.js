const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const userService = require("../services/users");

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

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "UserSpeed",
//   password: "el!365X!@",
//   database: "ctParent"
// });

// let pool = mysql.createPool({
//   connectionLimit: 100,
//   waitForConnections: true,
//   queueLimit: 0,
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "ctparent",
//   debug: true,
//   wait_timeout: 28800,
//   connect_timeout: 10
// });

// var self = this;
// var pool = mysql.createPool({
//   connectionLimit: 100,
//   waitForConnections: true,
//   queueLimit: 0,
//   host: "127.0.0.1",
//   user: "SpeedUser",
//   password: "el!365X!@",
//   database: "elixiatech",
//   debug: true,
//   wait_timeout: 28800,
//   connect_timeout: 10,
//   port: 3306
// });
//self.configureExpress(pool);
//self.configureExpress(pool);

authUser = function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  if (
    typeof username == "undefined" ||
    username == "" ||
    typeof password == "undefined" ||
    password == "undefined"
  ) {
    return res.json({
      code: 204,
      message: "Please send username and password"
    });
  } else {
    pool.query(
      'select * from user where username = "' +
        username +
        '" AND isdeleted=0 AND password=SHA1("' +
        password +
        '")',
      function(error, results, fields) {
        if (error) {
          return res.json({
            code: 400,
            message: "error occured",
            error: error
          });
        } else {
          if (results.length > 0) {
            const user = {
              username: results[0]["userName"],
              userId: results[0]["userId"]
            };

            const userId = results[0]["userId"];
            let arrProducts = "";
            let isTokenInserted = "";
            jwt.sign(
              { user },
              "secretkey",
              { expiresIn: "300000s" },
              async (err, token) => {
                if (token !== "") {
                  // get User Product Map
                  const userProduct = await userService.getUserProductMapping(
                    pool,
                    userId
                  );

                  if (userProduct !== "") {
                    arrProducts = await userService.getUserMappedProductName(
                      pool,
                      userProduct
                    );
                  }

                  if (arrProducts !== "") {
                    isTokenInserted = await userService.insertTokenIntoProducts(
                      pool,
                      arrProducts,
                      token,
                      user
                    );
                  }
                  // return res.json({
                  //   code: 400,
                  //   message: isTokenInserted
                  // });

                  if (isTokenInserted) {
                    // pool.release();
                    return res.json({
                      status: 200,
                      message: "success",
                      resultSet: {
                        token
                      }
                    });
                  }
                }
              }
            );
          } else {
            return res.json({
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
