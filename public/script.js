//var tst = require("./module1");
// let age = prompt('How old are you?', 100);
// alert(`You are ${age} years old!`); // You are 100 years old!
/*************************************************************/

function format(a) {
    if (a <= 9) {
        return "0" + a 
    }else{
        return a
    }
}
function timeToString(elem){
    let timeString = elem.getHours() +":" + format(elem.getMinutes()) + ":" + format(elem.getSeconds());
    return timeString;
}
function updateClock(){
    let date = new Date();
    let timeString = timeToString(date);
    document.getElementById("clock").innerText = timeString;
    setTimeout(updateClock, 1000);
}


//add event listeners to buttons
const element = document.getElementById("addTimerBtn");
element.addEventListener("click", addTimer);
//global labelID - Counter of number of created timers
let labelID = 0;
function addTimer(){
    //let labelID = 0; #this would be a local variable that is initialized each time
    //a new timer is added to 0 and then incremented to 1 for each new timer,
    //a global version of the labelID (outside the function addTimer) will work correctly.
    labelID++;
    let myTimeout;
    let h = 0, m = 0, s = 0;
    var stopped = false;
    let timeString = h +":" + format(m) + ":" + format(s);
    let newDiv = document.createElement("div");
    let newLabel = document.createElement("label");
    //add stop Btn
    let stopBtn = document.createElement("button");
    stopBtn.innerText = "Stop";
    stopBtn.id = "stopBtn" + labelID;
    stopBtn.addEventListener("click",function(){
        alert("Timer Stopped");
        stopped = true;
        let btn1 = document.getElementById("stopBtn" + labelID);
        let btn2 = document.getElementById("resumeBtn");
        btn1.style.display = 'none';
        clearTimeout(myTimeout);
    });
    //select the label id of the correct and current instance of the timer 
    let labelString = "label" + labelID;
    newLabel.id = labelString;
    newLabel.innerText = timeString;
    newDiv.appendChild(newLabel);
    newDiv.appendChild(stopBtn);
    let add1 = document.getElementById("origin");
    add1.appendChild(newDiv);
    function updateTimer(){
        if(stopped){
            return;
        }
        s++;
        if(s >= 60){
            m++;
            s=0;
        }
        if(m >= 60){
            h++;
            m=0;
        }
        let timeString = h +":" + format(m) + ":" + format(s);
        
        let timer = document.getElementById(labelString);
        timer.innerText = timeString;
        myTimeout = setTimeout(updateTimer,1000);
    }
    updateTimer(0);
}
