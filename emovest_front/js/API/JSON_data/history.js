const Binance = require("node-binance-api");
const path = require("path");
const Keys    = require('./config.js');
// require("dotenv").config();
// const Keys = {
//   APIKEY: process.env.binance_api_key,
//   APISECRET: process.env.binance_api_secret,
// };
const binance = new Binance().options(Keys);
var fs = require("fs");

let options = {
  limit: 2, // Limit results to two entries
};

const AllSymbol = require('./symbol.json');


//讀取symbol.json，呼叫getHistoryTradeData
for (var k = 0; k < AllSymbol.length ; k++) {
  getHistoryTradeData(AllSymbol[k], k);
}

setTimeout(function(){
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


//向Binance取得各幣種的history trade的數據，並將有交易紀錄存取到./Json路徑下 
async function getHistoryTradeData(symbol, k){
  await binance.allOrders(symbol, (error, orders, symbol) => {
    // console.info(symbol+" orders:", orders);
    // console.log(k + " " + symbol + " : " +orders.length)

    if (orders.length > 0) {
      fs.writeFileSync("./Json/" + symbol + ".json", JSON.stringify(orders), function (error) {
        if (error != null) {
            console.log(error)
        } else {
            console.log(symbol + '.json文件寫入成功')
        }
      })
    } else {console.log(symbol + " have no histroy trade")}
  });
}


async function main(symbolname, period) {
  await getAveragePrice(symbolname, period).then((v) => {
    console.log(v);
  });
}


async function getAveragePrice(TradingPair, ViewTime) {
  //傳入要算的交易對的名稱, 還有要觀察的時間（用UnixTime）
  const ALLOrder = JSON.parse(fs.readFileSync("./Json/" + TradingPair + ".json"));

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
  console.log("Symbol:" + TradingPair)
  console.log("TotalQuan:" + TotalQuan);
  console.log("TotalSpend:" + TotalSpend);
  var Ave = TotalSpend / TotalQuan;
  return Ave;
}

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });
