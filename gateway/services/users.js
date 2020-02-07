const mysql = require("mysql");
const db = require("../config/config");

module.exports.isAuthenticated = async (pool, userId) => {
  if (userId !== "") {
    return new Promise((resolve, reject) => {
      let sql =
        "select product from userproductmapping where userId = " + userId + "";
      pool.query(sql, function(error, results, fields) {
        if (error) {
          reject(error);
        } else {
          if (results.length > 0) {
            resolve(results[0]["product"]);
          } else {
            reject("No details Found");
          }
        }
      });
    });
  }
};

module.exports.getUserProductMapping = (pool, userId) => {
  if (userId !== "") {
    return new Promise((resolve, reject) => {
      let sql =
        "select productId from userproductmapping where userId = " +
        userId +
        " and isActive = 1";

      pool.query(sql, function(error, results, fields) {
        if (error) {
          reject(error);
        } else {
          if (results.length > 0) {
            resolve(results);
          } else {
            reject("No details Found");
          }
        }
      });
    });
  }
};

module.exports.getUserMappedProductName = (pool, arrProduct) => {
  return new Promise((resolve, reject) => {
    console.log(arrProduct);
    if (arrProduct.length > 0) {
      let arrTemp = [];
      for (let i = 0; i < arrProduct.length; i++) {
        arrTemp.push(arrProduct[i]["productId"]);
      }

      let productNames = "(" + arrTemp.join(",") + ")";

      let sql =
        "select productName from productmaster where productId IN " +
        productNames +
        " ";

      pool.query(sql, (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          if (results.length > 0) {
            resolve(results.map(Products => Products.productName));
          } else {
            reject("No details Found");
          }
        }
      });
    }
  });
};

module.exports.insertTokenIntoProducts = async (
  pool,
  productIds,
  token,
  user
) => {
  return new Promise(async (resolve, reject) => {
    if (productIds.length > 0) {
      try {
        let isTokenInsertedFlag = false;
        const response = await Promise.all(
          productIds.map(async product => {
            if (product !== "") {
              isTokenInsertedFlag = await this.insertToken(
                product,
                token,
                user
              );
              resolve(isTokenInsertedFlag);
            }
          })
        );
      } catch (e) {
        console.log(e);
        // reject({
        //   msg: e
        // });
      }
    }
  });
};

module.exports.setConnectionForProduct = async product => {
  return new Promise((resolve, reject) => {
    if (product === "Speed") {
      const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "speed"
      });
      resolve(connection);
    } else if (product === "Control Tower") {
      const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "controltower"
      });
      resolve(connection);
    } else {
      reject("No Product Found");
    }
  });
};

module.exports.updateToken = (connection, token, user) => {
  return new Promise((resolve, reject) => {
    connection.connect(function(err) {
      if (!err) {
        let sql =
          "select token from user where username = '" +
          user.username +
          "' and isdeleted = 0 ";

        connection.query(sql, function(err, results, fields) {
          if (err) {
            reject(err);
          } else {
            if (results.length > 0) {
              let sqlUpdate =
                "UPDATE user set token = '" +
                token +
                "' where username = '" +
                user.username +
                "'";
              connection.query(sqlUpdate, function(err, results, fields) {
                if (err) {
                  reject(err);
                }
                if (
                  typeof results.affectedRows !== "undefined" &&
                  results.affectedRows > 0
                ) {
                  resolve(true);
                }
              });
            }
          }
        });
      } else {
        reject("error connecting with Speed database");
      }
    });
  });
};

module.exports.insertToken = async (product, token, user) => {
  return new Promise(async (resolve, reject) => {
    if (token !== "") {
      try {
        let connection = await this.setConnectionForProduct(product);
        console.log(connection);

        if (connection) {
          const result = await this.updateToken(connection, token, user);
          resolve(result);
        } else {
          //   reject("error");
        }
      } catch (e) {
        reject("No Product Found");
      }
    }
  });
};

module.exports.createUser = async (req, res) => {
  const customerno = req.body.customerno;
  const realname = req.body.realname;
  const username = req.body.username;
  const password = req.body.password;
  const role = req.body.role;
  const email = req.body.email;
  const phone = req.body.phone;
  const product = req.body.product;
  if (typeof customerno === "undefined" || customerno.trim() == "") {
    return res.json({
      code: 204,
      message: "Please send customerno"
    });
  }

  if (typeof realname === "undefined" || realname.trim() == "") {
    return res.json({
      code: 204,
      message: "Please send realname"
    });
  }

  if (typeof username === "undefined" || username.trim() == "") {
    return res.json({
      code: 204,
      message: "Please send username"
    });
  }

  if (typeof password === "undefined" || password.trim() == "") {
    return res.json({
      code: 204,
      message: "Please send password"
    });
  }

  if (typeof role === "undefined" || role.trim() == "") {
    return res.json({
      code: 204,
      message: "Please send role"
    });
  }

  if (typeof email === "undefined" || email.trim() == "") {
    return res.json({
      code: 204,
      message: "Please send email"
    });
  }
  if (typeof phone === "undefined" || phone.trim() == "") {
    return res.json({
      code: 204,
      message: "Please send phone"
    });
  }

  if (typeof product === "undefined" || product.trim() == "") {
    return res.json({
      code: 204,
      message: "Please send product"
    });
  }

  try {
    const con = db.connectdb("parent");
    const isExists = await this.checkisUserAlreadyExists(con, username);
    if (isExists) {
      return res.json({
        code: 204,
        message: "UserName Already Exists "
      });
    } else {
      // if user doesn't exist create New User
      const isInserted = await this.insertUser(db, req);
      if (isInserted) {
        return res.json({
          status: 200,
          message: "success",
          resultSet: {
            msg: "Inserted"
          }
        });
      } else {
        return res.json({
          code: 204,
          message: "Failed"
        });
      }
    }
  } catch (e) {
    return res.json({
      code: 204,
      message: e
    });
  }
};

module.exports.checkisUserAlreadyExists = (db, username) => {
  return new Promise((resolve, reject) => {
    if (username !== "") {
      if (con) {
        con.query(
          `SELECT username FROM user where username = '${username}' and 'isActive' = '1'`,
          (err, results, fields) => {
            if (err) reject(err);
            if (results.length > 0) {
              resolve(true);
            }
          }
        );
      }
    } else {
      reject(false);
    }
  });
};

module.exports.insertUser = (db, req) => {
  return new Promise((resolve, reject) => {
    const {
      customerno,
      realname,
      username,
      password,
      role,
      email,
      phone
    } = req.body;
    const roleId = 4;
    if (db) {
      db.query(`INSERT INTO user(userId, userName, realName, email, mobileNo, roleId, password, isActive, customerNo, isDeleted)
         VALUES (NULL,'${username}','${realname}','${email}','${phone}','${roleId}',SHA1('${password}'),'1','${customerno}','0'`),
        function(err, results, fields) {
          if (err) reject(err);
          if (results.length > 0) {
            resolve(1);
          }
        };
    }
  });
};

module.exports.isUserExist = (db, username) => {
  return new Promise((resolve, reject) => {
    if (username !== "") {
      let sql = `SELECT userName FROM user where userName = '${username}' and isActive = '1' and isDeleted = '0'`;
      db.query(sql, (err, results) => {
        if (err) reject(err);
        if (results.length > 0) {
          resolve(results);
        } else {
          resolve(false);
        }
      });
    } else {
      reject("UserName is Missing");
    }
  });
};

module.exports.isSuperAdmin = (db, userId) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT roleId from user where userId = ${userId} and isActive = 1 and isDeleted = '0'`;
    db.query(sql, (err, result) => {
      if (err) reject(err);
      if (result.length > 0) {
        resolve(result[0]["roleId"] === 1 ? true : false);
      }
    });
  });
};
