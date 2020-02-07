const mysql = require("mysql");
function connectdb(param) {
  if (param !== "" && param == "parent") {
    let pool = mysql.createPool({
      connectionLimit: 100,
      waitForConnections: true,
      queueLimit: 0,
      host: "localhost",
      user: "root",
      password: "",
      database: "ctparent",
      debug: true,
      wait_timeout: 28800,
      connect_timeout: 10
    });
    return pool;
  } else {
    return false;
  }
}

module.exports = {
  secret: "qweqweqwe",
  connectdb
};
