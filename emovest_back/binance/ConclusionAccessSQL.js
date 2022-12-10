async function ConclusionAccessSQL(address) {
  var mysql = require("mysql");
  require("dotenv").config();
  var fs = require("fs");
  var connect = mysql.createConnection({
    host: process.env.sql_host,
    user: process.env.sql_user,
    password: process.env.sql_password,
    database: process.env.sql_trans_database,
  });

  connect.query(
    "DELETE FROM trans_data WHERE `Address`= '" + address + "'",
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
      var Address = conclusion[a][b].Address;
      var Symbol = conclusion[a][b].Symbol;
      var TotalQuan = conclusion[a][b].TotalQuan;
      var TotalSpend = conclusion[a][b].TotalSpend;
      var LatestPrice = conclusion[a][b].LatestPrice;
      var AvgCost = conclusion[a][b].AvgCost;
      var UpAndDown = conclusion[a][b].UpAndDown;
      var ProfitAndLoss = conclusion[a][b].ProfitAndLoss;
      var ProfitAndLossAmount = conclusion[a][b].ProfitAndLossAmount;
      var RecordTime = conclusion[a][b].time;
      var ViewTime = conclusion[a][b].ViewTime;
      connect.query(
        `INSERT INTO trans_data (Address, Symbol, TotalQuan, TotalSpend, LatestPrice, AvgCost, UpAndDown, ProfitAndLoss, ProfitAndLossAmount, RecordTime, ViewTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          Address,
          Symbol,
          TotalQuan,
          TotalSpend,
          LatestPrice,
          AvgCost,
          UpAndDown,
          ProfitAndLoss,
          ProfitAndLossAmount,
          RecordTime,
          ViewTime,
        ],
        function (err, result) {
          if (err) throw err;
          console.log("INSERT FINISH.");
        }
      );
    }
  }
}
module.exports = { ConclusionAccessSQL };
