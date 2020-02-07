const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
    res.send("welcome to Masters Api ");
    //data = {};
    //res.render('index', { title: 'Express' , records : data});
});

module.exports = router;