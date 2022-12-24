

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

AllData();

function AllData(){
    deletetext();
    
    fetch('http://34.81.139.175:45001/emoInvestTotal')
    .then((response) => {
      return response.json();
    })
    .then( (response) => {
        console.log(response)
        if (response.length > 0) {
            response.forEach(function(item, index, array){
                indexinvestfirstlayerr(response);
            });
        } else {
            indexinvestTabDemo2Nodata();
        }
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    })
}

for (var i = 0; i < 1; i++) {

    //Unix time of a week = 604800
    function weekAlert(){
        deletetext();
        
        fetch('http://34.81.139.175:45001/emoInvestWeek')
        .then((response) => {
          return response.json();
        })
        .then( (response) => {
            console.log(response)
            if (response.length > 0) {
                response.forEach(function(item, index, array){
                  indexinvestTabDemo(item);
                });
            } else {
                  indexinvestTabDemoNodata();
            }
        })
        .catch((error) => {
          console.log(`Error: ${error}`);
        })
    }
    var ele = document.getElementsByClassName('week');
    ele[i].onclick = weekAlert;
    
    //Unix time of a month = 2678400
    function monthAlert(){
        deletetext();
        
        fetch('http://34.81.139.175:45001/emoInvestMonth')
        .then((response) => {
          return response.json();
        })
        .then( (response) => {
            console.log(response)
            if (response.length > 0) {
                response.forEach(function(item, index, array){
                  indexinvestTabDemo(item);
                });
            } else {
                  indexinvestTabDemoNodata();
            }
        })
        .catch((error) => {
          console.log(`Error: ${error}`);
        })
    }
    var ele = document.getElementsByClassName('month');
    ele[i].onclick = monthAlert;
    
    //Unix time of half year = 15768000
    function halfyearAlert(){
        deletetext();
        
        fetch('http://34.81.139.175:45001/emoInvestHalfYear')
        .then((response) => {
          return response.json();
        })
        .then( (response) => {
            console.log(response)
            if (response.length > 0) {
                response.forEach(function(item, index, array){
                  indexinvestTabDemo(item);
                });
            } else {
                  indexinvestTabDemoNodata();
            }
        })
        .catch((error) => {
          console.log(`Error: ${error}`);
        })
    }
    var ele = document.getElementsByClassName('halfyear');
    ele[i].onclick = halfyearAlert;
    
    //Unix time of a year = 31536000
    function yearAlert(){
        deletetext();
        
        fetch('http://34.81.139.175:45001/emoInvestYear')
        .then((response) => {
          return response.json();
        })
        .then( (response) => {
            console.log(response);
            if (response.length > 0) {
                response.forEach(function(item, index, array){
                  indexinvestTabDemo(item);
                });
            } else {
                  indexinvestTabDemoNodata();
            }
        })
        .catch((error) => {
          console.log(`Error: ${error}`);
        })
    }
    var ele = document.getElementsByClassName('year');
    ele[i].onclick = yearAlert;

    //Unix time of all = 999999999
    function AllDataAlert(){
        deletetext();
        
        fetch('http://34.81.139.175:45001/emoInvestTotal')
        .then((response) => {
          return response.json();
        })
        .then( (response) => {
            console.log(response)
            if (response.length > 0) {
                response.forEach(function(item, index, array){
                    indexinvestTabDemo(item);
                });
            } else {
                indexinvestTabDemo2Nodata();
            }
        })
        .catch((error) => {
          console.log(`Error: ${error}`);
        })
    }
    var ele = document.getElementsByClassName('pagerefresh');
    ele[i].onclick = AllDataAlert;
    
}
    
//IndexSignIn.html，取得User input的email和password
function AddUserIdentify(value) {
    alert("已接收");
    var apikeyInput = document.getElementsByClassName("apikey");
    var apisecretInput = document.getElementsByClassName("apisecret");
    var apikey = apikeyInput[0].value;
    var apisecret = apisecretInput[0].value;
    alert("apikey:" + apikey + "\n apisecret:" + apisecret);
}

function deletetext(){

    const TabDemo = document.querySelector('[data-target="tab-demo"]')
  
    TabDemo.innerHTML =``

}

function indexinvestTabDemoNodata(){

    const TabDemo = document.querySelector('[data-target="tab-demo"]')
  
    TabDemo.innerHTML =

    `<div class="NoTrans">

    <p>您在這段期間內並無任何交易資料，請選擇更長的期間。</p>
    
    </div>`

}

function indexinvestTabDemo(data){

  const TabDemo = document.querySelector('[data-target="tab-demo"]')

  TabDemo.innerHTML +=

      `<div class="tab-demo">

<div class="blankbox1"></div>

<div class="tab-inner-wrap">

<div id="one" class="tab-inner">

<h3>${data.Symbol}</h3>

<div class="text1">

    <p>每單位成本價</p>

    <p>${Math.round(data.AvgCost * 1000) / 1000} USDT</p>

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

        <p>${Math.round(data.UpAndDown * 1000 ) / 1000} %</p>

        <p>${Math.round(data.ProfitAndLoss * 1000) / 1000} %</p>

        <p>${Math.round(data.ProfitAndLossAmount * 1000) / 1000} USDT</p>

    </div>

</div>

</div>

</div>
                      
<div class="blankbox"></div>

</div>`

}


function indexinvestTabDemo2Nodata(){

    const TabDemo = document.querySelector('[data-target="tab-demo"]')
  
    TabDemo.innerHTML =

    `<div class="NoTrans">

    <p>您目前沒有任何交易資料。</p>
    
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

      AllSymbolUpAndDownPersent = Math.round(AllSymbolUpAndDown / AllSymbolCost * 100000) / 1000;


      if (k == Alldata.length - 1) {

          var Processdata=(JSON.parse(JSON.stringify({
            
            MarketValue:Math.round(MarketValue * 1000) / 1000, 
            
            AllSymbolCost:Math.round(AllSymbolCost * 1000) / 1000, 
            
            AllSymbolUpAndDown:Math.round((AllSymbolUpAndDown) * 1000) / 1000, 
            
            AllSymbolUpAndDownPersent:AllSymbolUpAndDownPersent
        
          })));

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




const innertext = document.querySelector('[data-target="innertext"]')

innertext.innerHTML =

      `<h4> ${Processdata.AllSymbolUpAndDownPersent} %</h4>`


if (AllSymbolUpAndDownPersent > 0) {

//圓餅圖1-1的Script (正報酬)
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['總成本', '總損益 (+)'],
        datasets: [{
            label: '# of Votes',
            data: [Processdata.AllSymbolCost, Processdata.AllSymbolUpAndDown],
            backgroundColor: [
                'rgba(232, 194, 155, 0.8)',
                'rgba(173, 231, 148, 1)'
            ],
            borderColor: [
                'rgba(247, 226, 201, 1)',
                'rgba(103, 230, 49, 0.9)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

} else {

//圓餅圖1-2的Script (負報酬)
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['總市值', '總損益 (-)'],
        datasets: [{
            label: '# of Votes',
            data: [Processdata.MarketValue, Processdata.AllSymbolUpAndDown],
            backgroundColor: [
                'rgba(232, 194, 155, 0.8)',
                'rgba(241, 112, 83, 0.8)'
            ],
            borderColor: [
                'rgba(247, 226, 201, 1)',
                'rgba(255, 94, 79, 0.8)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

}


//圓餅圖2的Script
const ctx2 = document.getElementById('myChart2').getContext('2d');
const myChart2 = new Chart(ctx2, {
    type: 'pie',
    data: {
        labels: [Alldata[0].Symbol, Alldata[1].Symbol, Alldata[2].Symbol],
        datasets: [{
            label: '# of Votes',
            data: [Alldata[0].TotalSpend, Alldata[1].TotalSpend, Alldata[2].TotalSpend],
            backgroundColor: [
                'rgba(211, 160, 115, 1)',
                'rgba(232, 194, 155, 1)',
                'rgba(247, 226, 201, 1)'
            ],
            borderColor: [
                'rgba(211, 160, 115, 0.8)',
                'rgba(232, 194, 155, 0.8)',
                'rgba(247, 226, 201, 0.8)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

}