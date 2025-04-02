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


//add event listeners to buttons
const element = document.getElementById("addTimerBtn");
element.addEventListener("click", addTimer);

function addTimer(){
    let h = 0, m = 0, s = 0;
    let timeString = h +":" + format(m) + ":" + format(s);
    let newDiv = document.createElement("div");
    let newLabel = document.createElement("label");
    newLabel.id = "label1";
    newLabel.innerText = timeString;
    newDiv.appendChild(newLabel);
    let add1 = document.getElementById("origin");
    add1.appendChild(newDiv);
    updateTimer(0);
}

function updateTimer(seconds=0, minutes=0, hours=0){
    let h = hours, m = minutes, s = seconds;
    if(s >= 60){
        m++;
        s=0;
    }
    else if(m >= 60){
        h++;
        m=0;
    }
    let timeString = h +":" + format(m) + ":" + format(s);
    let timer = document.getElementById("label1");
    timer.innerText = timeString;
    setTimeout( function(){
        updateTimer(s+1,m,h)}
        ,1000);
    
}
