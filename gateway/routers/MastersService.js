const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const connection = require("../config/config");
const dbservices = require("../services/dbServices");

router.get("/", (req, res) => {
  console.log("Masters");
  return res.json({ msg: "coming" });
});

router.get("", (req, res) => {
  console.log("Masters");
  return res.json({ msg: "coming2" });
});

module.exports = router;
