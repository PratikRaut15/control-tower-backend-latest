var express = require("express");
const router = express.Router();
const mysql = require("mysql");
const connection = require("../config/config");
const dbservices = require("./dbServices");
const apiAdapter = require("../routers/apiAdapter");

let BASE_URL = "http://localhost:5002/api/";
let api = apiAdapter(BASE_URL);

router.get("/", (req, res) => {
  return res.json({ msg: "coming1111" });
});

router.post("/", (req, res) => {
  return res.json({ msg: "coming from post" });
});

router.get("/temp", (req, res) => {
  return res.json({ msg: "coming2" });
});

router.post("/getProducts", async (req, res) => {
  const db = connection.connectdb("parent");
  if (db) {
    try {
      const products = await dbservices.getProducts(db);
      if (products) {
        return res.json({
          status: 200,
          message: "success",
          result: products
        });
      }
    } catch (e) {
      return res.json({
        code: 204,
        message: e
      });
    }
  }
});

router.post("/getRoles", async (req, res) => {
  let db = connection.connectdb("parent");
  if (db) {
    try {
      const Roles = await dbservices.getRoles(db);
      if (Roles) {
        return res.json({
          status: 200,
          message: "success",
          result: Roles
        });
      }
    } catch (e) {
      return res.json({
        code: 204,
        message: e
      });
    }
  }
});

router.post("/createUser", async (req, res) => {
  const {
    customerNo,
    productMasters,
    roleMasters,
    username,
    loggedInUser
  } = req.body;
  if (
    customerNo === "" ||
    productMasters === "" ||
    roleMasters === "" ||
    username === "" ||
    loggedInUser === ""
  ) {
    return res.json({
      code: 204,
      message: "Incomplete data Sent Across"
    });
  } else {
    let db = connection.connectdb("parent");
    const result = await dbservices.createUser(db, req.body, res);
  }

  //const result = await userService.createUser(req, res);
});

router.get("/masters", (req, res) => {
  //   return res.json({
  //     message: "coming",
  //     BASE_URL,
  //     path: req.path
  //   });
  api
    .get(req.path)
    .then(resp => {
      return res.send(resp.data);
    })
    .catch(err => console.log(err));
});

router.get("/masters/:hashtag", (req, res) => {
  api
    .get(req.path)
    .then(resp => {
      return res.send(resp.data);
    })
    .catch(err => console.log(err));
});

router.post("/masters/:hashtag", (req, res) => {
  api
    .post(req.path)
    .then(resp => {
      return res.send(resp.data);
    })
    .catch(err => console.log(err));
});

router.put("/masters/:hashtag", (req, res) => {
  api
    .put(req.path)
    .then(resp => {
      return res.send(resp.data);
    })
    .catch(err => console.log(err));
});

router.delete("/masters/:hashtag", (req, res) => {
  api
    .delete(req.path)
    .then(resp => {
      return res.send(resp.data);
    })
    .catch(err => console.log(err));
});

// forwarding Masters to Gateway

module.exports = router;
