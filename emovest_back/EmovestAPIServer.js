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
        }
      );
      res.writeHead(200, { "Content-type": "application/json" });
      res.end('{"symbol":"BTC", "score":' + rows[0] + "}");
    }
  });

  server.listen(port);
}

main();
