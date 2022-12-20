

// Any of the following formats may be used
constctx = document.getElementById('myChart');
constctx = document.getElementById('myChart').getContext('2d');
constctx = $('#myChart');
constctx = 'myChart';

constctx2 = document.getElementById('myChart2');
constctx2 = document.getElementById('myChart2').getContext('2d');
constctx2 = $('#myChart2');
constctx2 = 'myChart2';

// alert('connect');

var period = 0;

for (var i = 0; i < 1; i++) {

    //Unix time of a week = 604800
    function weekAlert(){
        alert("The period is week");
        
        fetch('http://34.81.139.175:45001/emoInvestWeek')
        .then((response) => {
          return response.json();
        })
        .then( (response) => {
            console.log(response)
            response.forEach(function(item, index, array){
                indexinvestTabDemo(item);
            });
        })
        .catch((error) => {
          console.log(`Error: ${error}`);
        })
    }
    var ele = document.getElementsByClassName('week');
    ele[i].onclick = weekAlert;
    
    //Unix time of a month = 2678400
    function monthAlert(){
        alert("The period is month");
        
        fetch('http://34.81.139.175:45001/emoInvestMonth')
        .then((response) => {
          return response.json();
        })
        .then( (response) => {
            console.log(response)
            response.forEach(function(item, index, array){
                indexinvestTabDemo(item);
            });
        })
        .catch((error) => {
          console.log(`Error: ${error}`);
        })
    }
    var ele = document.getElementsByClassName('month');
    ele[i].onclick = monthAlert;
    
    //Unix time of half year = 15768000
    function halfyearAlert(){
        alert("The period is halfyear");
        
        fetch('http://34.81.139.175:45001/emoInvestHalfYear')
        .then((response) => {
          return response.json();
        })
        .then( (response) => {
            console.log(response)
            response.forEach(function(item, index, array){
                indexinvestTabDemo(item);
            });
        })
        .catch((error) => {
          console.log(`Error: ${error}`);
        })
    }
    var ele = document.getElementsByClassName('halfyear');
    ele[i].onclick = halfyearAlert;
    
    //Unix time of a year = 31536000
    function yearAlert(){
        alert("The period is year");
        
        fetch('http://34.81.139.175:45001/emoInvestYear')
        .then((response) => {
          return response.json();
        })
        .then( (response) => {
          //emoScore=response.score;
            console.log(response);
            response.forEach(function(item, index, array){
                indexinvestTabDemo(item);
            });
        })
        .catch((error) => {
          console.log(`Error: ${error}`);
        })
    }
    var ele = document.getElementsByClassName('year');
    ele[i].onclick = yearAlert;
    
}

//indexinvestfirstlayerr(response);
    
//IndexSignIn.html，取得User input的email和password
function AddUserIdentify(value) {
    alert("已接收");
    var apikeyInput = document.getElementsByClassName("apikey");
    var apisecretInput = document.getElementsByClassName("apisecret");
    var apikey = apikeyInput[0].value;
    var apisecret = apisecretInput[0].value;
    alert("apikey:" + apikey + "\n apisecret:" + apisecret);
}
    
    // var eee = document.querySelector('.signin');
    // eee.addEventListener("click", UserIdentify);
    // eee[0].onclick = UserIdentify;



function indexinvestTabDemo(data){

    const TabDemo = document.querySelector('[data-target="tab-demo"]')
      
    TabDemo.innerHTML +=
      
    `<div class="tab-demo">
      
    <div class="blankbox"></div>
      
    <div id="one" class="tab-inner">
      
    <h3>${data.Symbol} 永續</h3>
      
    <div class="text1">
      
        <p>每單位成本價</p>
      
        <p>${data.AvgCost} USDT</p>
      
    </div>
      
    <div class="vline3">
      
        <hr>
      
    </div>
      
    <div class="text2">
      
        <div class="text2l">
      
            <p>漲跌</p>
      
            <p>損益</p>
      
            <p>歷史盈虧</p>
      
        </div>
      
        <div class="text2r">
      
            <p>${data.UpAndDown} %</p>
      
            <p>${data.ProfitAndLoss} %</p>
      
            <p>${data.ProfitAndLossAmount} USDT</p>
      
        </div>
      
    </div>
      
    <div class="pic">
      
        <img src="img/K線圖軟體2.jpeg">
      
    </div>
      
    </div>
                            
    <div class="blankbox"></div>
      
    </div>`
      
}


function indexinvestfirstlayerr(Alldata){
    var MarketValue = 0;
    var AllSymbolCost = 0;
    var AllSymbolUpAndDown = 0;

    for (var k = 0; k < Alldata.length; k++){

        MarketValue += Alldata[k].LatestPrice * Alldata[k].TotalQuan;

        AllSymbolCost += Alldata[k].TotalSpend;

        AllSymbolUpAndDown = MarketValue - AllSymbolCost;


        if (k = Alldata.length - 1) {

            var Processdata=(JSON.parse(JSON.stringify({MarketValue:MarketValue, AllSymbolCost:AllSymbolCost, AllSymbolUpAndDown:AllSymbolUpAndDown})));

            console.log(Processdata);

        }
    }

    const firstlayerr = document.querySelector('[data-target="firstlayerr"]')

    firstlayerr.innerHTML =

    `<div class="innertext2">
                
    <h4 class="text1">虛擬貨幣市值：${Processdata.MarketValue} USTD</h4><br>
                
    <h4 class="text2">總成本：${Processdata.AllSymbolCost} USTD</h4><br>
                
    <h4 class="text3">總損益：${Processdata.AllSymbolUpAndDown} USTD</h4>
                
  </div>`

}