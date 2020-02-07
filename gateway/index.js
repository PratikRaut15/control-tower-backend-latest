var express = require("express");
var app = express();
const cors = require("cors");
app.use(cors());
const entitities = require("./services/entity");
const dispatch = require("./routers/dispatchService");
const MasterRoutes = require("./routers/masterService");
const dbServices = require("./routers/dispatchService");

//var router = require("./routers/router");
var bodyParser = require("body-parser");
//var db = require("./db");
const middleware = require("./middlewares/auth");
const userService = require("./services/users");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Simple API Gateway");
});

app.post("/", (req, res) => {
  res.send("Simple API Gateway from POST");
});
// app.use("/mastersApi", masters);
app.use("/dispatch", dispatch);
app.use("/api", entitities);
app.use("/masters", MasterRoutes);

app.post("/login", (req, res) => {
  // Authenticating user with DB
  if (
    typeof req.body.username === "undefined" ||
    typeof req.body.password === "undefined"
  ) {
    return res.json({
      code: 204,
      message: "Please send username and password"
    });
  }
  middleware.authUser(req, res);
  //const returnedData = login.authUser(req, res);
  //Mock user
});

//app.use(router);

app.listen(5000, console.log("Simple API Gateway run on localhost:5000"));
