var express = require("express");
var router = express.Router();
const apiAdapter = require("./apiAdapter");
const isAuthorized = require("../controller/requestAuthenticator");

/* const BASE_URL = 'http://localhost:8000' */
let BASE_URL = "http://localhost:5001/dispatchApi/dispatch";
let api = apiAdapter(BASE_URL);

router.get(
  "/dispatch",
  /* isAuthorized,  */ (req, res) => {
    console.log("I am here in get....");
    api.get(req.path).then(resp => {
      res.send(resp.data);
    });
  }
);

router.get(
  "/dispatch/:hashtag",
  /* isAuthorized, */ (req, res) => {
    api.get(req.path).then(resp => {
      res.send(resp.data);
    });
  }
);

router.delete(
  "/dispatch",
  /* isAuthorized, */ (req, res) => {
    console.log("I am here in delete....");
    api.delete(req.path, req.body).then(resp => {
      res.send(resp.data);
    });
  }
);

router.delete(
  "/feeds",
  /*  isAuthorized, */ (req, res) => {
    api.get(req.path).then(resp => {
      res.send(resp.data);
    });
  }
);

router.post(
  "/dispatch",
  /*  isAuthorized, */ (req, res) => {
    api.post(req.path).then(resp => {
      res.send(resp.data);
    });
  }
);
module.exports = router;
