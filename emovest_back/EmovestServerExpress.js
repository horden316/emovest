var express = require("express");
var cors = require("cors"); //cors 的預設為全開放
var app = express();
require("dotenv").config();
var mysql = require("mysql");
var bodyParser = require("body-parser");
const port = 45001;

var urlencodedParser = bodyParser.urlencoded({ extended: false });

// connect MySQL
var connection = mysql.createConnection({
  host: process.env.sql_host,
  user: process.env.sql_user,
  password: process.env.sql_password,
  database: process.env.sql_database,
});

function main() {
  app.use(cors());
  app.get("/", function (req, res) {
    res.send("hello world");
  });

  app.post("/WalletSig", urlencodedParser, function (req, res) {
    console.log(req.body.Address);
    console.log(req.body.Signature);
  });

  app.listen(port);
}
main();
