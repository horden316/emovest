const Binance = require("node-binance-api");
const Keys = require("./config.js");
const binance = new Binance().options(Keys);
var fs = require("fs");

let options = {
  limit: 2, // Limit results to two entries
};

//trade 歷史紀錄
binance.trades(
  "ETHUSDT",
  (error, trades, symbol) => {
    fs.writeFile("./trade.json", JSON.stringify(trades), function (error) {
      console.log(error);
      console.log("文件寫入成功");
    });
    for (let k in trades) {
      let trade = trades[k];
      let tradeDateTime = new Date(trade.time);
      console.log(`Trade event --------------------------------`);
      console.log(`time             : ${tradeDateTime}`);
      console.log(`symbol           : ${trade.symbol}`);
      console.log(`price            : ${trade.price}`);
      console.log(`quantity         : ${trade.qty}`);
      console.log(`commission fee   : ${trade.commission}`);
      console.log(`commission asset : ${trade.commissionAsset}`);
      //    console.log(trade);
    }
  },
  options
);

/*


//取得balance
binance.balance((error, balances) => {
    if ( error ) return console.error(error);
    console.info("balances()" + JSON.stringify(balances));
    console.info("ETH balance: ", balances.ETH.available);
  });

  */

binance.allOrders("ETHUSDT", (error, orders, symbol) => {
  console.info(symbol + " orders:", JSON.stringify(orders));
  fs.writeFile("./ETHUSDT.json", JSON.stringify(orders), function (error) {
    console.log(error);
    console.log("文件寫入成功");
  });
});
