
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
    //new timer - increment timer counter
    labelID++;
    let myTimeout;
    let h = 0, m = 0, s = 0;
    let stopped = false;

    let timeString = h +":" + format(m) + ":" + format(s);
    let newDiv = document.createElement("div");
    let newLabel = document.createElement("label");

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
    //###Label Setup
    //select the label id of the correct and current instance of the timer 
    let labelString = "label" + labelID;
    newLabel.id = labelString;
    newLabel.innerText = timeString;
    //###Append elements
    newDiv.appendChild(newLabel);
    newDiv.appendChild(stopBtn);
    document.getElementById("origin").appendChild(newDiv);
    
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
        
        document.getElementById(labelString).innerText = timeString;
        myTimeout = setTimeout(updateTimer,1000);
    }
    updateTimer(0);
}
