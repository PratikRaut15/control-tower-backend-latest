const express = require("express");
const router = express.Router();

router.post("/uploadExcel", (req, res) => {
  if (req.files) {
    const filename = req.files.file.name;

    // getting excel details
    const xlsx = require("xlsx");
    const wb = xlsx.readFile(filename);
    const ws = wb.Sheets["Sheet1"];
    //console.log(ws);

    var data = xlsx.utils.sheet_to_json(ws);
    console.log(data);

    // getting excel details
  }
  res.json({ msg: "Welcome to API" });
});

module.exports = router;
