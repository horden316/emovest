let express = require('express');
  // 1.載入express模組
let app = express();
  // 2.使用express
app.use(express.urlencoded({
    extended:false
}))

app.get('/', function (req, res) {
    res.send(
        `<form action = "/answer" method = "POST">
            <p>Gusee, what color clothes do I like?</p>
            <input name = "preferColor" autocomplete = "off"></input>
            <button>Send the answer</button>
        </form>`
    )
    // console.log("get".res.send)
})
/* <form action = "/answer" method = "POST"></form>會從主頁導到"/answer"頁面 
並將User的input POST上來，所以需要透過app.post('/answer')來表示"/answer"頁面如何回應 */

app.post('/answer', function (req, res) {
    // console.log(req)
    if(req.body.preferColor == "red"){
        res.send("Bingo! You really know me!")
    }else{
        res.send("Sorry, not the answer.><")
    }
    // res.send("Thanks for your reply")
})
// 藉由req.body.[input name]來取得User輸入的資料

  // 5.首頁



  (function() {
    // STEP 1: WE DO - Use axios to get random user
    const BASE_URL = "https://randomuser.me/api/";
    axios.get(BASE_URL)
      .then(response => {
      const data = response.data.results[0];
      // 將response.data.results的第一筆資料[0]定義到data上
    
      console.log('data', data)
    })
  
  // STEP 5: YOU DO - Use axios to get multiple friends
  })();


let port = 3000;
  // 3.設定port位置
app.listen(port);
  // 4.監聽 port