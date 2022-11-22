const Binance = require('node-binance-api');
const Keys    = require('./config.js');
const binance = new Binance().options(Keys);
var fs = require('fs')

let options = { 
    limit: 2 // Limit results to two entries
};

// binance.trades("BTCUSDT", (error, trades, symbol) => {
  // console.log(trades)
  // console.log(trades.length);
  // for (let k in trades){
  // console.info(trades[k].symbol);
  // }
// });

// getLatestPrice();
// getFuturesPrices();

// async function getLatestPrice(){
//   let ticker = await binance.prices()
//   console.log(ticker);
// }

// binance.prices('BNBBTC', (error, ticker) => {
//   console.info("Price of BNB: ", ticker.BNBBTC);
//   console.log(ticker);
// });

// async function getFuturesPrices(){
//   await binance.futuresPrices().then(result =>{
//     console.log(result.BNBUSDT)
//   }).catch(err=>{console.log(err)})
//   console.info( await binance.futuresPrices() );
// }

// binance.balance((error, balances) => {
//   if ( error ) return console.error(error);
//   console.info("balances()", balances);
//   console.info("ETH balance: ", balances.ETH.available);
// });


// trade 歷史紀錄
// binance.trades("ETHUSDT", (error, trades, symbol) => {  
//     for(let k in trades) { 
//     let trade = trades[k];
//     let tradeDateTime = new Date(trade.time);
//     console.log(`Trade event --------------------------------`);
//     console.log(`time             : ${tradeDateTime}`);
//     console.log(`symbol           : ${trade.symbol}`);
//     console.log(`price            : ${trade.price}`);
//     console.log(`quantity         : ${trade.qty}`);
//     console.log(`commission fee   : ${trade.commission}`);
//     console.log(`commission asset : ${trade.commissionAsset}`);
// //    console.log(trade);
//     }
// }, options);

/*
//取得balance
binance.balance((error, balances) => {
    if ( error ) return console.error(error);
    console.info("balances()" + JSON.stringify(balances));
    console.info("ETH balance: ", balances.ETH.available);
});
*/

// binance.allOrders("ETHUSDT", (error, orders, symbol) => {
//   // console.info(symbol + " orders:" + '\n', JSON.stringify(orders));
//   fs.writeFile('./trade.json', JSON.stringify(orders),function (error) {
//     if (error != null) {
//       console.log(error)
//     }else {
//       console.log('文件寫入成功')
//   }})
// });