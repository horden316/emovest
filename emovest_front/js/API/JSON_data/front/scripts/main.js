

// Any of the following formats may be used
constctx = document.getElementById('myChart');
constctx = document.getElementById('myChart').getContext('2d');
constctx = $('#myChart');
constctx = 'myChart';

constctx2 = document.getElementById('myChart2');
constctx2 = document.getElementById('myChart2').getContext('2d');
constctx2 = $('#myChart2');
constctx2 = 'myChart2';


for (var i = 0; i < 3; i++) {

//Unix time of a week = 604800
function weekAlert(){
    alert("The period is week");
    period = 604800;
}
var ele = document.getElementsByClassName('week');
ele[i].onclick = weekAlert;

//Unix time of a month = 2678400
function monthAlert(){
    alert("The period is month");
    period = 2678400;
}
var ele = document.getElementsByClassName('month');
ele[i].onclick = monthAlert;

//Unix time of half year = 15768000
function halfyearAlert(){
    alert("The period is halfyear");
    period = 15768000;
}
var ele = document.getElementsByClassName('halfyear');
ele[i].onclick = halfyearAlert;

//Unix time of a year = 31536000
function yearAlert(){
    alert("The period is year");
    period = 31536000;
}
var ele = document.getElementsByClassName('year');
ele[i].onclick = yearAlert;

}


//IndexSignIn.html，取得User input的email和password
function UserIdentify(value) {
  alert("已接收");
  var emailInput = document.getElementById("emailemail");
  var passwordInput = document.getElementById("passwordpassword");
  var email = emailInput.value;
  var password = passwordInput.value;
  alert("email:" + email + "\n password:" + password);
}

// var eee = document.querySelector('.signin');
// eee.addEventListener("click", UserIdentify);
// eee[0].onclick = UserIdentify;