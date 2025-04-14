
function format(a) {
    if (a <= 9) {
        return "0" + a; 
    }else{
        return a;
    }
}

function timeToString(elem){
    let timeString = format(elem.getHours()) +":" + format(elem.getMinutes()) + ":" + format(elem.getSeconds());
    //AM PM functionality
    let ampm = "";
    if(elem.getHours()>= 0 && elem.getHours() <=11 ){
        ampm = "AM";
    }else{
        ampm = "PM";
    }
    timeString = timeString + " " + ampm;
    return timeString;
}

function updateClock(){
    let date = new Date();
    let timeString = timeToString(date);
    document.getElementById("clock").innerText = timeString;
    setTimeout(updateClock, 1000);
}


//add event listeners to buttons
const element1 = document.getElementById("stopwatchOption");
element1.addEventListener("click", addStopWatch);
const element2 = document.getElementById("timezoneOption");
element2.addEventListener("click", myFunction);
//global labelID - Counter of number of created timers
let labelID = 0;
function myFunction(){
    alert("Implementing");
}
function addStopWatch(){
    //new timer - increment timer counter
    labelID++;
    let myTimeout;
    let h = 0, m = 0, s = 0;
    let stopped = false;

    let timeString = format(h) +":" + format(m) + ":" + format(s);
    let newDiv = document.createElement("div");
    let newLabel = document.createElement("label");
    //create a stop button
    let stopBtn = document.createElement("button");
    stopBtn.innerText = "Stop";
    stopBtn.id = "stopBtn" + labelID;
    
    //create a resume button
    let resumeBtn = document.createElement("button");
    resumeBtn.innerText = "Resume";
    resumeBtn.id = "resumeBtn" + labelID;
    resumeBtn.style.display = "none";

    stopBtn.addEventListener("click",function(){
        stopped = true;
        stopBtn.style.display = 'none';
        resumeBtn.style.display = 'inline';
        clearTimeout(myTimeout);
    });
    

    resumeBtn.addEventListener("click",function(){
        stopped = false;
        stopBtn.style.display = 'inline';
        resumeBtn.style.display = 'none';
        updateTimer(); 
    })
    //###Label Setup
    //select the label id of the correct and current instance of the timer 
    let labelString = "label" + labelID;
    newLabel.id = labelString;
    newLabel.innerText = timeString;
    //###Append elements
    newDiv.appendChild(newLabel);
    newDiv.appendChild(stopBtn);
    newDiv.appendChild(resumeBtn);
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
