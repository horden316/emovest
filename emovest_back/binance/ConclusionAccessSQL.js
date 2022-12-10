async function ConclusionAccessSQL(address) {
  var mysql = require("mysql");
  require("dotenv").config();
  var connect = mysql.createConnection({
    host: process.env.sql_host,
    user: process.env.sql_user,
    password: process.env.sql_password,
    database: process.env.sql_trans_database,
  });

  connect.query(
    "DELETE FROM trans_data WHERE `address`= '" + address + "';",
    function (err, result) {
      if (err) throw err;
      console.log("DELETE FINISH.");
    }
  );

  var conclusion = [
    JSON.parse(
      fs.readFileSync("./emovest_back/binance/604800000conclusion.json")
    ),
    JSON.parse(
      fs.readFileSync("./emovest_back/binance/2678400000conclusion.json")
    ),
    JSON.parse(
      fs.readFileSync("./emovest_back/binance/15768000000conclusion.json")
    ),
    JSON.parse(
      fs.readFileSync("./emovest_back/binance/31536000000conclusion.json")
    ),
    JSON.parse(
      fs.readFileSync("./emovest_back/binance/99999999999conclusion.json")
    ),
  ];

  for (var a = 0; a < conclusion.length; a++) {
    for (var b = 0; b < conclusion[a].length; b++) {
      connect.query(
        "INSERT INTO trans_data (`Address`, `Symbol`, `TotalQuan`, `TotalSpend`, `LatestPrice`, `AvgCost`, `UpAndDown`, `ProfitAndLoss`, `ProfitAndLossAmount`, `RecordTime`, `ViewTime`) VALUE (conclusion[a][b].Address, conclusion[a][b].Symbol, conclusion[a][b].TotalQuan, conclusion[a][b].TotalSpend, conclusion[a][b].LatestPrice, conclusion[a][b].AvgCost, conclusion[a][b].UpAndDown, conclusion[a][b].ProfitAndLoss, conclusion[a][b].ProfitAndLossAmount, conclusion[a][b].RecordTime, conclusion[a][b].ViewTime)",
        function (err, result) {
          if (err) throw err;
          console.log("INSERT FINISH.");
        }
      );
    }
  }
}
module.exports = { ConclusionAccessSQL };
