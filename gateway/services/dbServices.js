const userService = require("./users");
module.exports.getProducts = db => {
  return new Promise((resolve, reject) => {
    if (db) {
      let sql = `SELECT productId,productName FROM productmaster where isDeleted = 0`;
      db.query(sql, (err, results, fields) => {
        if (err) reject(err);
        if (results.length > 0) {
          resolve(results);
        }
      });
    } else {
      reject(false);
    }
  });
};

module.exports.getRoles = db => {
  return new Promise((resolve, reject) => {
    if (db) {
      let sql = "SELECT roleId,role FROM `role`";
      db.query(sql, (err, results, fields) => {
        if (err) reject(err);
        if (results.length > 0) {
          resolve(results);
        }
      });
    } else {
      reject(false);
    }
  });
};

module.exports.isProductExist = (db, productId) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT productId from productmaster where productId = ${productId} and isDeleted = '0'`;
    db.query(sql, (err, results) => {
      if (err) reject(err);
      if (results.length > 0) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  });
};

module.exports.isuserproductAlreadyMapped = (
  db,
  userId,
  productId,
  customerNo
) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT userId, productId,customerNo from userproductmapping where userId = '${userId}' and productId = '${productId}'
        and customerNo = '${customerNo}' and isActive = '1' and isDeleted = 0 `;
    db.query(sql, (err, results) => {
      if (err) reject(err);
      if (results.length > 0) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  });
};

module.exports.insertUserProductMapping = req => {
  return new Promise((resolve, reject) => {
    let {
      customerNo,
      productMasters,
      roleMasters,
      loggedInUser,
      username
    } = req;
    let sql = `INSERT INTO userproductmapping(cpMapId, userId, productId, isActive, customerNo, createdBy, createdOn, updatedBy, updatedOn, isDeleted) 
        VALUES (NULL,'${userId}','${productMasters}','1','${customerNo}',) `;
    resolve(sql);
  });
};

module.exports.createUser = async (db, req, res) => {
  return new Promise(async (resolve, reject) => {
    let {
      customerNo,
      productMasters,
      roleMasters,
      loggedInUser,
      username
    } = req;
    try {
      // check is logged in User is Super Admin

      let isSuperAdmin = await userService.isSuperAdmin(db, loggedInUser);
      //    return res.json({ msg: isSuperAdmin });
      if (!isSuperAdmin) {
        return res.json({
          code: 204,
          message: "Not a Super Admin"
        });
      }

      let isExist = await userService.isUserExist(db, username);
      if (isExist) {
        return res.json({
          code: 204,
          message: "userName already Exist"
        });
      }

      if (!isExist) {
        let isProductExist = await this.isProductExist(db, productMasters);

        if (isProductExist) {
          let isuserproductAlreadyMapped = this.isuserproductAlreadyMapped(
            db,
            loggedInUser,
            productMasters,
            customerNo
          );

          if (!isuserproductAlreadyMapped) {
            //  Insert User in Parent Database
            this.insertUserInParentDb();
            let response = await this.insertUserProductMapping(req.body);
            return res.json({ msg: response });
          }
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
