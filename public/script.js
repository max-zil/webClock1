//var tst = require("./module1");

// let age = prompt('How old are you?', 100);
// alert(`You are ${age} years old!`); // You are 100 years old!
function format(a) {
    if (a <= 9) {
        return "0" + a 
    }else{
        return a
    }
}
function updateClock(){
    let date = new Date();
    let timeString = date.getHours() +":" + format(date.getMinutes()) + ":" + format(date.getSeconds());
    document.getElementById("clock").innerText = timeString;
    setTimeout(updateClock, 1000);
}
