var express = require("express");
var app = express();
require("dotenv").config();
var mysql = require("mysql");
const port = 45001;

// connect MySQL
var connection = mysql.createConnection({
  host: process.env.sql_host,
  user: process.env.sql_user,
  password: process.env.sql_password,
  database: process.env.sql_database,
});

app.get("/", function (req, res) {
  res.send("hello world");
});

app.post("/WalletSig", function (req, res) {
  console.log(req.query.id);
  console.log(req.body.name);
  console.log(req.body.tel);
});

app.listen(port);

main();
