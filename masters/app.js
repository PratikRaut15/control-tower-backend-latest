const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const jwt = require("jsonwebtoken");
// using cors library for sending headers
const upload = require("express-fileupload");
app.use(upload());

const login = require("./routes/loginroutes");
const masters = require("./routes/masterRoutes");
const dispatch = require("./routes/dispatchRoutes");
const bodyParser = require("body-parser");

var path = require("path");
var home = require("./routes/home");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// setting views directory
app.use(express.static(path.join(__dirname, "public")));

//Allow json to be accepted
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/masters", masters);
//app.use("/api/dispatch", dispatch);
app.use("/", home);

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to the API"
  });
});

app.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        code: 201,
        message: "Post created...",
        authData
      });
    }
  });
});

app.post("/api/login", (req, res) => {
  // Authenticating user with DB
  /* login.authUser(req.body.userName,req.body.password);   */
  const returnedData = login.authUser(req, res);
  //Mock user
  const user = {
    id: 1,
    username: "elixia",
    email: "elxiatech.com"
  };
  /* res.send({
   // JSON.stringify(resultData);
}) */
  //var jsonData = JSON.parse(JSON.stringify(res));
  console.log("Data returned is: " + returnedData);
  /*   jwt.sign({user:user}, 'secretkey', { expiresIn:'30s' } ,(err,token)=>{
    res.json({
        token
    })
  }); */
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}
app.listen(5002, () => console.log("Server started on port 5002"));
