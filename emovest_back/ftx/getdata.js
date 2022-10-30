const crypto = require("crypto");
const https = require("https");
var fs = require("fs");
require("dotenv").config();
const FTX_API_KEY = process.env.ftx_api_key;
const FTX_API_SECRET = process.env.ftx_api_secret;

const hostname = "ftx.com";
const endpoint = "/api/orders/history?market=ETH/USD";
const method = "GET";
const nonce = Date.now();

const hmac = crypto.createHmac("sha256", FTX_API_SECRET);
const signature_payload = `${nonce}${method}${endpoint}`;
hmac.update(signature_payload);
const digestHex = hmac.digest("hex");

const options = {
  host: hostname,
  port: 443,
  path: endpoint,
  method,
  headers: {
    "FTX-KEY": FTX_API_KEY,
    "FTX-SIGN": digestHex,
    "FTX-TS": nonce.toString(),
  },
};

var req = https.request(options, function (res) {
  res.on("data", function (data) {
    console.log(data.toString());
    fs.appendFile("./trade.json", data.toString(), function (error) {
      console.log(error);
      console.log("文件寫入成功");
    });
  });
});

req.end();
