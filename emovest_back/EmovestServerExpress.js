var express = require("express");
var cors = require("cors"); //cors 的預設為全開放
var app = express();
require("dotenv").config();
var mysql = require("mysql");
const ethers = require("ethers");
var bodyParser = require("body-parser");
const port = 45001;

// create application/json parser
var jsonParser = bodyParser.json();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

// connect MySQL
var connection = mysql.createConnection({
  host: process.env.sql_host,
  user: process.env.sql_user,
  password: process.env.sql_password,
  database: process.env.sql_database,
});

var connectionInvest = mysql.createConnection({
  host: process.env.sql_host,
  user: process.env.sql_user,
  password: process.env.sql_password,
  database: process.env.sql_trans_database,
});

function main() {
  app.use(cors());
  app.get("/", function (req, res) {
    if (err) throw err;
    res.send("hello world");
  });

  app.get("/emoscoreBTC", function (req, res) {
    connection.query(
      'SELECT Score FROM result_score_ave WHERE Symbol="BTC"',
      function (err, rows, fields) {
        if (err) throw err;
        console.log("BTC score is: ", rows[0]);
        res.writeHead(200, { "Content-type": "application/json" });
        res.end('{"symbol":"BTC", "score":' + rows[0].Score + "}");
      }
    );
  });

  app.get("/emoscoreETH", function (req, res) {
    connection.query(
      'SELECT Score FROM result_score_ave WHERE Symbol="ETH"',
      function (err, rows, fields) {
        if (err) throw err;
        console.log("ETH score is: ", rows[0]);
        res.writeHead(200, { "Content-type": "application/json" });
        res.end('{"symbol":"ETH", "score":' + rows[0].Score + "}");
      }
    );
  });

  app.get("/emoscoreBNB", function (req, res) {
    connection.query(
      'SELECT Score FROM result_score_ave WHERE Symbol="BNB"',
      function (err, rows, fields) {
        if (err) throw err;
        console.log("BNB score is: ", rows[0]);
        res.writeHead(200, { "Content-type": "application/json" });
        res.end('{"symbol":"BNB", "score":' + rows[0].Score + "}");
      }
    );
  });

  app.get("/emoscoreXRP", function (req, res) {
    connection.query(
      'SELECT Score FROM result_score_ave WHERE Symbol="XRP"',
      function (err, rows, fields) {
        if (err) throw err;
        console.log("XRP score is: ", rows[0]);
        res.writeHead(200, { "Content-type": "application/json" });
        res.end('{"symbol":"XRP", "score":' + rows[0].Score + "}");
      }
    );
  });

  app.get("/emoscoreADA", function (req, res) {
    connection.query(
      'SELECT Score FROM result_score_ave WHERE Symbol="ADA"',
      function (err, rows, fields) {
        if (err) throw err;
        console.log("ADA score is: ", rows[0]);
        res.writeHead(200, { "Content-type": "application/json" });
        res.end('{"symbol":"ADA", "score":' + rows[0].Score + "}");
      }
    );
  });

  app.get("/emoscoreSOL", function (req, res) {
    connection.query(
      'SELECT Score FROM result_score_ave WHERE Symbol="SOL"',
      function (err, rows, fields) {
        if (err) throw err;
        console.log("SOL score is: ", rows[0]);
        res.writeHead(200, { "Content-type": "application/json" });
        res.end('{"symbol":"SOL", "score":' + rows[0].Score + "}");
      }
    );
  });

  app.get("/emoscoreDOGE", function (req, res) {
    connection.query(
      'SELECT Score FROM result_score_ave WHERE Symbol="DOGE"',
      function (err, rows, fields) {
        if (err) throw err;
        console.log("DOGE score is: ", rows[0]);
        res.writeHead(200, { "Content-type": "application/json" });
        res.end('{"symbol":"DOGE", "score":' + rows[0].Score + "}");
      }
    );
  });

  app.get("/emoscoreDOT", function (req, res) {
    connection.query(
      'SELECT Score FROM result_score_ave WHERE Symbol="DOT"',
      function (err, rows, fields) {
        if (err) throw err;
        console.log("DOT score is: ", rows[0]);
        res.writeHead(200, { "Content-type": "application/json" });
        res.end('{"symbol":"DOT", "score":' + rows[0].Score + "}");
      }
    );
  });

  app.get("/emoscoreTRX", function (req, res) {
    connection.query(
      'SELECT Score FROM result_score_ave WHERE Symbol="TRX"',
      function (err, rows, fields) {
        if (err) throw err;
        console.log("TRX score is: ", rows[0]);
        res.writeHead(200, { "Content-type": "application/json" });
        res.end('{"symbol":"TRX", "score":' + rows[0].Score + "}");
      }
    );
  });

  app.get("/emoscoreAVAX", function (req, res) {
    connection.query(
      'SELECT Score FROM result_score_ave WHERE Symbol="AVAX"',
      function (err, rows, fields) {
        if (err) throw err;
        console.log("AVAX score is: ", rows[0]);
        res.writeHead(200, { "Content-type": "application/json" });
        res.end('{"symbol":"AVAX", "score":' + rows[0].Score + "}");
      }
    );
  });

  app.get("/emoscoreLUNA", function (req, res) {
    connection.query(
      'SELECT Score FROM result_score_ave WHERE Symbol="LUNA"',
      function (err, rows, fields) {
        if (err) throw err;
        console.log("LUNA score is: ", rows[0]);
        res.writeHead(200, { "Content-type": "application/json" });
        res.end('{"symbol":"LUNA", "score":' + rows[0].Score + "}");
      }
    );
  });
  /////////////
  //invest
  /////////////

  app.get("/emoInvestWeek", function (req, res) {
    connectionInvest.query(
      //還沒把Address拿出來
      'SELECT * FROM trans_data WHERE Address = "" AND ViewTime = 604800000 AND TotalSpend <> 0 ORDER BY TotalSpend DESC',
      function (err, rows, fields) {
        if (err) throw err;
        console.log("The period is Week");
        res.writeHead(222, { "Content-type": "application/json" });
        res.end(JSON.stringify(rows));
        console.log(JSON.stringify(rows));
      }
    );
  });

  app.get("/emoInvestMonth", function (req, res) {
    connectionInvest.query(
      //還沒把Address拿出來
      'SELECT * FROM trans_data WHERE Address = "" AND ViewTime = 2678400000 AND TotalSpend <> 0 ORDER BY TotalSpend DESC',
      function (err, rows, fields) {
        if (err) throw err;
        console.log("The period is Month");
        res.writeHead(222, { "Content-type": "application/json" });
        res.end(JSON.stringify(rows));
        console.log(JSON.stringify(rows));
      }
    );
  });

  app.get("/emoInvestHalfYear", function (req, res) {
    connectionInvest.query(
      //還沒把Address拿出來
      'SELECT * FROM trans_data WHERE Address = "" AND ViewTime = 15768000000 AND TotalSpend <> 0 ORDER BY TotalSpend DESC',
      function (err, rows, fields) {
        if (err) throw err;
        console.log("The period is HalfYear");
        res.writeHead(222, { "Content-type": "application/json" });
        res.end(JSON.stringify(rows));
        console.log(JSON.stringify(rows));
      }
    );
  });

  app.get("/emoInvestYear", function (req, res) {
    connectionInvest.query(
      //還沒把Address拿出來
      'SELECT * FROM trans_data WHERE Address = "" AND ViewTime = 31536000000 AND TotalSpend <> 0 ORDER BY TotalSpend DESC',
      function (err, rows, fields) {
        if (err) throw err;
        console.log("The period is Year");
        res.writeHead(222, { "Content-type": "application/json" });
        res.end(JSON.stringify(rows));
        console.log(JSON.stringify(rows));
      }
    );
  });

  app.get("/emoInvestTotal", function (req, res) {
    connectionInvest.query(
      //還沒把Address拿出來
      'SELECT * FROM trans_data WHERE Address = "" AND ViewTime = 99999999999 AND TotalSpend <> 0 ORDER BY TotalSpend DESC',
      function (err, rows, fields) {
        if (err) throw err;
        console.log("The period is Total");
        res.writeHead(222, { "Content-type": "application/json" });
        res.end(JSON.stringify(rows));
        console.log(JSON.stringify(rows));
      }
    );
  });

  app.post("/WalletSig", jsonParser, function (req, res) {
    console.log(req.body.Address);
    console.log(req.body.Signature);
  });

  app.post("/WalletGetBinanceAPIKEY", jsonParser, function (req, res) {
    if (
      req.body.Address ==
      ethers.utils.verifyMessage("Welcome to Emovest", req.body.Signature)
    ) {
      connectionInvest.query(
        "SELECT `BinanceKEY`, `BinanceSECRET` FROM `userdata` WHERE `Address`='" +
          req.body.Address +
          "'",
        function (err, rows, fields) {
          if (err) throw err;
          Key = rows[0].BinanceKEY;
          Secret = rows[0].BinanceSECRET;
          res.writeHead(200, { "Content-type": "application/json" });
          res.end(
            '{"KEY":' +
              rows[0].BinanceKEY +
              ', "Secret":' +
              rows[0].BinanceSECRET +
              "}"
          );
        }
      );
    } else {
      res.end('{"KEY":0, "Secret":0}');
    }
  });

  app.post("/WalletSetBinanceAPIKEY", jsonParser, function (req, res) {
    console.log(req.body.Address);
    console.log(req.body.Signature);
  });

  app.listen(port);
}
main();
