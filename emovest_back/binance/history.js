async function history(address) {
  const Binance = require("node-binance-api");
  const path = require("path");
  var mysql = require("mysql");
  require("dotenv").config();

  var connection = mysql.createConnection({
    host: process.env.sql_host,
    user: process.env.sql_user,
    password: process.env.sql_password,
    database: process.env.sql_trans_database,
  });

  var Key = "";
  var Secret = "";
  console.log(address);
  connection.query(
    "SELECT `BinanceKEY`, `BinanceSECRET` FROM `userdata` WHERE `Address`='" +
      address +
      "'", //地址填這裡！！！
    function (err, rows, fields) {
      if (err) throw err;
      Key = rows[0].BinanceKEY;
      Secret = rows[0].BinanceSECRET;
      console.log(Key);
      console.log(Secret);
    }
  );

  setTimeout(() => {
    const binance = new Binance().options({
      APIKEY: Key,
      APISECRET: Secret,
    });

    var fs = require("fs");

    let options = {
      limit: 2, // Limit results to two entries
    };

    var data = [];
    const AllSymbol = require("./symbol.json");

    getLatestPrice();
    async function getLatestPrice() {
      let ticker = await binance.prices();
      // console.info(ticker);
      fs.writeFileSync(
        "./emovest_back/binance/Json/getLatestPrice.json",
        JSON.stringify(ticker)
      );
    }

    //讀取symbol.json，呼叫getHistoryTradeData
    for (var k = 0; k < AllSymbol.length; k++) {
      getHistoryTradeData(AllSymbol[k]);
    }

    setTimeout(function () {
      for (var k = 0; k < AllSymbol.length; k++) {
        main(AllSymbol[k], 31536000)
          .then(() => process.exit(0))
          .catch((error) => {
            console.error(error);
            process.exit(1);
          });
      }
    }, 10000);

    // binance.allOrders("BNBUSDT", (error, orders, symbol) => {
    //   console.info(symbol+" orders:", orders);
    //   console.log(orders.length)
    // });

    //向Binance取得各幣種的history trade的數據，並將有交易紀錄存取到./emovest_back/binance/Json路徑下
    async function getHistoryTradeData(symbol) {
      await binance.allOrders(symbol, (error, orders, symbol) => {
        // console.info(symbol+" orders:", orders);
        // console.log(k + " " + symbol + " : " +orders.length)

        if (orders.length > 0) {
          fs.writeFileSync(
            "./emovest_back/binance/Json/" + symbol + ".json",
            JSON.stringify(orders),
            function (error) {
              if (error != null) {
                console.log(error);
              } else {
                console.log(symbol + ".json文件寫入成功");
              }
            }
          );
        } // else {console.log(symbol + " have no histroy trade")}
      });
    }

    // binance.prices(symbolname, (error, ticker) => {
    //   console.log("Price of " + symbolname + ": " + Object.values(ticker));
    // });

    async function main(symbolname, period) {
      await getAveragePrice(symbolname, period).then((v) => {
        console.log(v);
      });
    }

    async function getAveragePrice(TradingPair, ViewTime) {
      //傳入要算的交易對的名稱, 還有要觀察的時間（用UnixTime）
      const ALLOrder = JSON.parse(
        fs.readFileSync("./emovest_back/binance/Json/" + TradingPair + ".json")
      );
      const getLatestPrice = JSON.parse(
        fs.readFileSync("./emovest_back/binance/Json/getLatestPrice.json")
      );
      const LatestPrice = getLatestPrice[TradingPair];

      const dateTime = Date.now();
      const timestamp = Math.floor(dateTime / 1000);

      var TransactionTime = 0; //交易次數
      var TotalSpend = 0; //每單的價格*數量相加
      var TotalQuan = 0; //每單的數量相加
      for (var i = 0; i < ALLOrder.length; i++) {
        if (
          ALLOrder[i].updateTime > timestamp - ViewTime &&
          ALLOrder[i].status == "FILLED" &&
          ALLOrder[i].side == "BUY"
        ) {
          TotalQuan += Number(ALLOrder[i].executedQty);
          TotalSpend +=
            Number(ALLOrder[i].executedQty) * Number(ALLOrder[i].price);
          TransactionTime += 1;
          // console.log("TransactionTime:" + TransactionTime);
          // console.log(TotalQuan);
          // console.log(TotalSpend);
        } else if (
          ALLOrder[i].updateTime > timestamp - ViewTime &&
          ALLOrder[i].status == "FILLED" &&
          ALLOrder[i].side == "SELL" &&
          TotalQuan > 0
        ) {
          TotalSpend =
            TotalSpend -
            (TotalSpend / TotalQuan) * Number(ALLOrder[i].executedQty);
          TotalQuan -= Number(ALLOrder[i].executedQty);
          TransactionTime += 1;
          // console.log("TransactionTime:" + TransactionTime);
          // console.log(TotalQuan);
          // console.log(TotalSpend);
        } else if (
          ALLOrder[i].updateTime > timestamp - ViewTime &&
          ALLOrder[i].status == "FILLED" &&
          ALLOrder[i].side == "SELL" &&
          TotalQuan <= 0
        ) {
          TotalQuan -= Number(ALLOrder[i].executedQty);
          TotalSpend -=
            Number(ALLOrder[i].executedQty) * Number(ALLOrder[i].price);
          TransactionTime += 1;
          // console.log("TransactionTime:" + TransactionTime);
          // console.log(TotalQuan);
          // console.log(TotalSpend);
        }
      }

      var Avg = TotalSpend / TotalQuan;
      var UpAndDown = Math.round((((LatestPrice - Avg) / Avg) * 10000) / 100.0);
      var ProfitAndLoss = Math.round(
        (((LatestPrice * TotalQuan) / TotalSpend - 1) * 10000) / 100.0
      );
      var ProfitAndLossAmount = LatestPrice * TotalQuan - TotalSpend;

      data.push(
        JSON.parse(
          JSON.stringify({
            Symbol: TradingPair,
            TotalQuan: TotalQuan,
            TotalSpend: TotalSpend,
            LatestPrice: LatestPrice,
            AvgCost: Avg,
            UpAndDown: UpAndDown,
            ProfitAndLoss: ProfitAndLoss,
            ProfitAndLossAmount: ProfitAndLossAmount,
            time: dateTime,
          })
        )
      );
      console.log(data);

      if ((i = ALLOrder.length)) {
        fs.writeFileSync(
          "./conclusion.json",
          JSON.stringify(data),
          function (error) {
            if (error != null) {
              console.log(error);
            } else {
              console.log("\nEnd of script");
            }
          }
        );
      }

      // console.log("Symbol:" + TradingPair);
      // console.log("TotalQuan:" + TotalQuan);
      // console.log("TotalSpend:" + TotalSpend);
      // console.log("LatestPrice:" + LatestPrice);
      // console.log("AvgCost:" + Avg);
      // console.log("UpAndDown:" + UpAndDown + "%");
      // console.log("ProfitAndLoss:" + ProfitAndLoss + "%");
      // console.log("ProfitAndLossAmount:" + ProfitAndLossAmount);
      console.log();
      return TradingPair + " TransactionTime = " + TransactionTime;
    }
  }, 2000);
}

module.exports = { history };
