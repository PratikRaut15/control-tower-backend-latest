var express = require("express");
var router = express.Router();
const apiAdapter = require("./apiAdapter");
const isAuthorized = require("../controller/requestAuthenticator");

/* const BASE_URL = 'http://localhost:8000' */
const BASE_URL = "http://localhost:5002/mastersApi";
const api = apiAdapter(BASE_URL);

router.get(
  "",
  /* isAuthorized,  */ (req, res) => {
    // res.json({ msg: "I am here in get...." });
    api.get(req.path).then(resp => {
      res.send(resp.data);
    });
  }
);

router.get(
  "/",
  /* isAuthorized,  */ (req, res) => {
    // res.json({ msg: "I am here in get...." });
    api.get(req.path).then(resp => {
      res.send(resp.data);
    });
  }
);

router.get(
  "/:hashtag",
  /* isAuthorized, */ (req, res) => {
    api.get(req.path).then(resp => {
      res.send(resp.data);
    });
  }
);

router.post(
  "/:hashtag",
  /* isAuthorized, */ (req, res) => {
    api.post(req.path).then(resp => {
      res.send(resp.data);
    });
  }
);

router.delete(
  "/",
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
  "/",
  /*  isAuthorized, */ (req, res) => {
    api.post(req.path).then(resp => {
      res.send(resp.data);
    });
  }
);
module.exports = router;
