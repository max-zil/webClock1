
function padTimeString(a) {
    if (a <= 9 && a>= 0) {
        return a.toString().padStart(2,"0"); 
    }
    return a;
}

function timeToString(elem){
    let timeString = padTimeString(elem.getHours()) +":" + padTimeString(elem.getMinutes()) + ":" + padTimeString(elem.getSeconds());
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

    let timeString = padTimeString(h) +":" + padTimeString(m) + ":" + padTimeString(s);
    let timezoneDiv = document.createElement("div");
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
    timezoneDiv.appendChild(newLabel);
    timezoneDiv.appendChild(stopBtn);
    timezoneDiv.appendChild(resumeBtn);
    document.getElementById("origin").appendChild(timezoneDiv);
    
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
        let timeString = h +":" + padTimeString(m) + ":" + padTimeString(s);
        
        document.getElementById(labelString).innerText = timeString;
        myTimeout = setTimeout(updateTimer,1000);
    }
    updateTimer(0);
}
//FileReader - Section
//handle files
const fileInput = document.getElementById("file-input");
const fileContent = document.getElementById("file-content");
const fileMessage = document.getElementById("file-message");

//add event listener for user choosing a file
fileInput.addEventListener("change", handleFile);

function handleFile(event){
    //select 1st file
    const file = event.target.files[0];
    fileContent.textContent = ""; //start with an empty string
    fileMessage.textContent = "";
    //validate file existence
    if (!file){
        showMessage("No file", "error");
        return;
    }
    if(!file.type.startsWith("text")){
        showMessage("Unsupported file type","error");
        return;
    }
    //read the file
    const readFile = new FileReader();
    readFile.onload = () => {
        fileContent.textContent = readFile.result;
    };
    readFile.onerror = () => {
        showMessage("Error reading file","error");
    };
    readFile.readAsText(file);
}

function showMessage(message, type){
    fileMessage.textContent = message;
    fileMessage.style.color = type === "error" ? "red" : "green";
}

//fetch API section
const fetchBtn = document.createElement("button");
fetchBtn.id = "fetchBtn";
fetchBtn.innerText = "fetch";
fetchBtn.addEventListener("click",getCSV);
document.body.appendChild(fetchBtn);

async function getCSV(){
    const path = "data/timezonesShort.csv";
    try{
        const response = await fetch(path);
        if(!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }
        const csv = await response.text();
        const rows = csv.trim().split("\n"); // Split by lines
        const headers = rows[0].split(","); // First row = headers

        const data = rows.slice(1).map(row => {
            const values = row.split(",");
            let newArr = [];
            let obj = {};
            headers.forEach((header,index)=>{
                newArr.push(obj[header.trim()] = values[index].trim());
            });
            return newArr;
        });

        console.log(data); // An array of objects
        displayData(data);
        
    } catch (error){
        console.error(error.message);
    }
}  

function isDST(timeZone) {
    const now = new Date();
    
    // Get standard time (usually January, when DST is off)
    const jan = new Date(now.getFullYear(), 0, 1);
    // Get current offset in minutes from UTC
    const standardOffset = -jan.toLocaleString('en-US', { timeZone, timeZoneName: 'short' }).match(/GMT([+-]\d+)/)[1];
  
    // Get current time zone offset
    const currentOffset = -now.toLocaleString('en-US', { timeZone, timeZoneName: 'short' }).match(/GMT([+-]\d+)/)[1];
  
    return currentOffset !== standardOffset;
}
  
console.log(isDST("Asia/Jerusalem")); // true if DST is active in Tel Aviv
  

function displayData(dataArr){
    cntr = 0;
    //clean aray 
    const timezoneArr = dataArr.map((x) => x[0].replaceAll(/["\/]/g, " "));
    console.log("clean: " + timezoneArr);
    timezoneArr.forEach((item) =>{
        const timezoneDiv = document.createElement("div");
        timezoneDiv.id = "timezoneDiv" + cntr;
        cntr++;
        console.log(item);
        timezoneDiv.innerText = "" + item;
        timezoneDiv.classList.add("data-display");
        const timeDiv = document.createElement("div");
        let timezoneID = "time-display" + "-" + item.trim().replaceAll(" ","-");
        console.log("id is: "+timezoneID);
        timeDiv.id = timezoneID;
        timeDiv.classList.add("time-display");
        timezoneDiv.appendChild(timeDiv);
        document.body.appendChild(timezoneDiv);
        
        
        
        ////////////////////////////////
        
        
    });
    getTimeTimezones(dataArr);
}
function getTimeTimezones(dataArr){
    dataArr.forEach((item) =>{
        timezoneID = "time-display" + "-" + item[0].replaceAll(/["\/]/g, " ").trim().replaceAll(" ","-");
        console.log("Katy perry: "+ timezoneID)
        const timeDiv = document.getElementById(timezoneID);
        console.log(timeDiv);
        const now = new Date();

        // Get time in Africa/Abidjan time zone as a string
        const abidjanTimeStr = new Intl.DateTimeFormat("en-US", {
            timeZone: "Africa/Abidjan",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            weekday: "long", 
            month: "long", 
            day: "numeric", 
            year: "numeric"
        }).format(now);
        let test, timeReq;
        // Create a new Date object for Africa/Abidjan time zone
        const abidjanDate = new Date(now.toLocaleString("en-US", { timeZone: "Africa/Abidjan" }));
        if(isDST){
            test = Number(item[2].replace(/"/g, ' '));

        }else{
            test = Number(item[1].replace(/"/g, ' '));

        }
        let offset = Number(test/(60*60));
        if(offset < 0 && Number(abidjanDate.getHours()) < Math.abs(offset)){
            timeReq = Number(abidjanDate.getHours()) + offset;
            console.log("Nicki: " + timeReq)
            timeReq = 24 + timeReq;

        }else{
            timeReq = Number(abidjanDate.getHours()) + offset;
        }
        
        if(timeReq >= 24){
            timeReq = timeReq - 24;
        }
        console.log("timeReq is: "+timeReq);
        timeStr =  padTimeString(timeReq) +":" + padTimeString(abidjanDate.getMinutes()) + ":" + padTimeString(abidjanDate.getSeconds());
        console.log(timeStr);
        timeDiv.innerText = timeStr;
        document.body.appendChild(timeDiv);
        setTimeout(() => getTimeTimezones(dataArr), 1000);

    });
}