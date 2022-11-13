const Binance = require("node-binance-api");
const path = require("path");
require("dotenv").config();
const Keys = {
  APIKEY: process.env.binance_api_key,
  APISECRET: process.env.binance_api_secret,
};
const binance = new Binance().options(Keys);
var fs = require("fs");

let options = {
  limit: 2, // Limit results to two entries
};

binance.allOrders("ETHUSDT", (error, orders, symbol) => {
  console.info(symbol + " orders:", JSON.stringify(orders));
  fs.writeFile("./ETHUSDT.json", JSON.stringify(orders), function (error) {
    console.log(error);
    console.log("文件寫入成功");
  });
});

async function main() {
  getAveragePrice("ETHUSDT", 31556926).then((v) => {
    console.log(v);
  });
}

async function getAllTradingPairAndPrice() {
  let ticker = await binance.prices();
  console.log(ticker);
}

async function getAveragePrice(TradingPair, ViewTime) {
  //傳入要算的交易對的名稱, 還有要觀察的時間（用UnixTime）
  const ALLOrder = JSON.parse(fs.readFileSync("./" + TradingPair + ".json"));

  const dateTime = Date.now();
  const timestamp = Math.floor(dateTime / 1000);

  var TotalSpend = 0; //每單的價格*數量相加
  var TotalQuan = 0; //每單的數量相加
  for (var i = 0; i < ALLOrder.length; i++) {
    if (
      ALLOrder[i].updateTime > timestamp - ViewTime &&
      ALLOrder[i].status == "FILLED" &&
      ALLOrder[i].side == "BUY"
    ) {
      TotalQuan += Number(ALLOrder[i].executedQty);
      TotalSpend += Number(ALLOrder[i].executedQty) * Number(ALLOrder[i].price);
    }
  }
  console.log(TotalQuan);
  console.log(TotalSpend);
  var Ave = TotalSpend / TotalQuan;
  return Ave;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
