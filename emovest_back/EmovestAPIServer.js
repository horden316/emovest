const http = require("http");
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

function main() {
  const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Request-Method", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
    res.setHeader("Access-Control-Allow-Headers", "*");
    console.log(req.headers);
    if (req.url == "/") {
      res.writeHead(200, { "Content-type": "text/plain" });
      //   res.end("mainPage");
      // } else if (req.url == "/user" && req.method == "GET") {
      //   res.writeHead(200, { "Content-type": "application/json" });
      //   res.end('{"name":"John", "age": "13"}');
      // } else if (req.url == "/user" && req.method == "POST") {
      //   res.writeHead(200, { "Content-type": "application/json" });
      //   res.end("got user data");
      // } else if (req.url == "/user" && req.method == "PUT") {
      //   res.writeHead(200, { "Content-type": "application/json" });
      //   res.end("user data updated");
      // } else if (req.url == "/user" && req.method == "DELETE") {
      //   res.writeHead(200, { "Content-type": "application/json" });
      //   res.end("user deleted");
    } else if (req.url == "/emoscoreBTC" && req.method == "GET") {
      connection.query(
        'SELECT Score FROM result_score_ave WHERE Symbol="BTC"',
        function (err, rows, fields) {
          if (err) throw err;
          console.log("BTC score is: ", rows[0]);
          res.writeHead(200, { "Content-type": "application/json" });
          res.end('{"symbol":"BTC", "score":' + rows[0].Score + "}");
        }
      );
    } else if (req.url == "/emoscoreETH" && req.method == "GET") {
      connection.query(
        'SELECT Score FROM result_score_ave WHERE Symbol="ETH"',
        function (err, rows, fields) {
          if (err) throw err;
          console.log("ETH score is: ", rows[0]);
          res.writeHead(200, { "Content-type": "application/json" });
          res.end('{"symbol":"ETH", "score":' + rows[0].Score + "}");
        }
      );
    } else if (req.url == "/emoscoreBNB" && req.method == "GET") {
      connection.query(
        'SELECT Score FROM result_score_ave WHERE Symbol="BNB"',
        function (err, rows, fields) {
          if (err) throw err;
          console.log("BNB score is: ", rows[0]);
          res.writeHead(200, { "Content-type": "application/json" });
          res.end('{"symbol":"BNB", "score":' + rows[0].Score + "}");
        }
      );
    } else if (req.url == "/emoscoreXRP" && req.method == "GET") {
      connection.query(
        'SELECT Score FROM result_score_ave WHERE Symbol="XRP"',
        function (err, rows, fields) {
          if (err) throw err;
          console.log("XRP score is: ", rows[0]);
          res.writeHead(200, { "Content-type": "application/json" });
          res.end('{"symbol":"XRP", "score":' + rows[0].Score + "}");
        }
      );
    } else if (req.url == "/emoscoreADA" && req.method == "GET") {
      connection.query(
        'SELECT Score FROM result_score_ave WHERE Symbol="ADA"',
        function (err, rows, fields) {
          if (err) throw err;
          console.log("ADA score is: ", rows[0]);
          res.writeHead(200, { "Content-type": "application/json" });
          res.end('{"symbol":"ADA", "score":' + rows[0].Score + "}");
        }
      );
    } else if (req.url == "/emoscoreSOL" && req.method == "GET") {
      connection.query(
        'SELECT Score FROM result_score_ave WHERE Symbol="SOL"',
        function (err, rows, fields) {
          if (err) throw err;
          console.log("SOL score is: ", rows[0]);
          res.writeHead(200, { "Content-type": "application/json" });
          res.end('{"symbol":"SOL", "score":' + rows[0].Score + "}");
        }
      );
    } else if (req.url == "/emoscoreDOGE" && req.method == "GET") {
      connection.query(
        'SELECT Score FROM result_score_ave WHERE Symbol="DOGE"',
        function (err, rows, fields) {
          if (err) throw err;
          console.log("DOGE score is: ", rows[0]);
          res.writeHead(200, { "Content-type": "application/json" });
          res.end('{"symbol":"DOGE", "score":' + rows[0].Score + "}");
        }
      );
    } else if (req.url == "/emoscoreDOT" && req.method == "GET") {
      connection.query(
        'SELECT Score FROM result_score_ave WHERE Symbol="DOT"',
        function (err, rows, fields) {
          if (err) throw err;
          console.log("DOT score is: ", rows[0]);
          res.writeHead(200, { "Content-type": "application/json" });
          res.end('{"symbol":"DOT", "score":' + rows[0].Score + "}");
        }
      );
    } else if (req.url == "/emoscoreTRX" && req.method == "GET") {
      connection.query(
        'SELECT Score FROM result_score_ave WHERE Symbol="TRX"',
        function (err, rows, fields) {
          if (err) throw err;
          console.log("TRX score is: ", rows[0]);
          res.writeHead(200, { "Content-type": "application/json" });
          res.end('{"symbol":"TRX", "score":' + rows[0].Score + "}");
        }
      );
    } else if (req.url == "/emoscoreAVAX" && req.method == "GET") {
      connection.query(
        'SELECT Score FROM result_score_ave WHERE Symbol="AVAX"',
        function (err, rows, fields) {
          if (err) throw err;
          console.log("AVAX score is: ", rows[0]);
          res.writeHead(200, { "Content-type": "application/json" });
          res.end('{"symbol":"AVAX", "score":' + rows[0].Score + "}");
        }
      );
    } else if (req.url == "/emoscoreLUNA" && req.method == "GET") {
      connection.query(
        'SELECT Score FROM result_score_ave WHERE Symbol="LUNA"',
        function (err, rows, fields) {
          if (err) throw err;
          console.log("LUNA score is: ", rows[0]);
          res.writeHead(200, { "Content-type": "application/json" });
          res.end('{"symbol":"LUNA", "score":' + rows[0].Score + "}");
        }
      );
    } else if (req.url == "/WalletSig" && req.method == "POST") {
      const AccountMessage = req.body;
      console.log(AccountMessage.Address + "   " + AccountMessage.Signature);
      res.send({ success: true }).end();
    }
  });

  server.listen(port);
}

main();
