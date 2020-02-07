module.exports.getProducts = db => {
  return new Promise(async (resolve, reject) => {
    if (db) {
      let sql = `SELECT productId,productName FROM productmaster`;
      db.query(sql, function(err, results, fields) {
        if (err) reject(err);
        if (results.length > 0) {
          resolve(results);
        }
      });
    }
  });
};
