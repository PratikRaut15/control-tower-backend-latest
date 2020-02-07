const express = require("express");
let router = express.Router();

router.get("", (req, res) => {
  console.log("coming");
  res.send("coming");
});

router.get("/", (req, res) => {
  console.log("coming");
  res.send("coming");
});

module.exports = router;
