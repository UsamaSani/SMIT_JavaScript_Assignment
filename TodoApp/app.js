let menubtn = document.getElementById("toggleMenu")
let menu = document.getElementById("menu")
let HighLightsBtn = document.getElementById("HighLights-btn")
let highLightsInfo = document.getElementById("hlInfo")
let reminderBtn = document.getElementById("reminderBtn")
let reminderInfo = document.getElementById("reminderInfo")
let TodoList = document.getElementById("Todo-List")
let addBtn = document.getElementById("addBtn")
let fixedBtn = document.getElementById("fixedBtn")
let createTask = document.getElementById("createTask")
let noTaskAvail = document.getElementById("noTaskAvail")
let description = document.getElementById("description")
let subject = document.getElementById("subject")
let taskAddBtn = document.getElementById("taskAddBtn")
let taskCancelBtn = document.getElementById("taskCancelBtn")
let mainContainer = document.getElementById("mainContainer")
menubtn.addEventListener('click',displayMenu)
HighLightsBtn.addEventListener('click',displayHighLights)
reminderBtn.addEventListener('click',displayReminders)
fixedBtn.addEventListener('click',displayTaskForm)
taskAddBtn.addEventListener('click',createList)
let sahi = false
let listInfo = []
let highLightsInfoList=[]
let reminderInfoList=[]
let srn = 0
function displayMenu(){
    if(menu.style.display == "none" || menu.style.display == ""){
        menu.style.display = "flex"
    }else{
        menu.style.display = "none"
        fixedBtn.style.display = "block"
    }
}
function displayHighLights(){
    if(highLightsInfo.style.display == "none" || highLightsInfo.style.display == ""){
       highLightsInfo.style.display = "flex"
    }else{
        highLightsInfo.style.display = "none"
    }
}
function displayReminders(){
    if(reminderInfo.style.display == "none" || reminderInfo.style.display == ""){
        reminderInfo.style.display = "flex"
    }else{
        reminderInfo.style.display = "none"
    }
}

function displayTaskForm(){
    if(createTask.style.display == "none"|| createTask.style.display == ""){
        createTask.style.display = "flex"
        noTaskAvail.style.display = "none"
    }else{
        createTask.style.display = "none"
    }
}

if(listInfo.length==0){
    srn =0
}
function createList(){
    if(subject.value==""||description.value==""){
        alert("input cannot be empty")
    }else{
    let sub = subject.value
    let desc = description.value
    srn +=1
    let listInfoObject = {
        Sr : srn,
        Subject : sub,
        Description : desc
    }
mainContainer.innerHTML=""
listInfo.push(listInfoObject)
    
    for(i=0;i<listInfo.length;i++){
        let info = listInfo[i]
        taskList(info.Subject,info.Description,info.Sr)
        // console.log(info.Sr)
    }
    // console.log(srn)
    subject.value=""
    description.value=""
}
}



function taskList(sb,ds,sr){
    let task = document.createElement("div")
    task.className = "task"
    task.id = "task-" + sr
    task.innerHTML = `
    <div class="adjustTask">
    <p class= "serialNumber">${sr}| </p>
    <input type="checkbox">
    <div class=" spacebetween">
    <p class ="clickSub">${sb}</p>
    <button class="editBtn"><img src="./Images/edit.png" alt="">EDIT</button>
    </div>
    </div>
    <div  class="displayDescription"><p>${ds}</p></div>
    `
    mainContainer.appendChild(task)
    task.querySelector(".clickSub").addEventListener('click',displayDescription)
    task.querySelector(".editBtn").addEventListener('click',editTask)
}

function displayDescription(event){
    let task  = event.target.closest(".task")
    let description = task.querySelector(".displayDescription");
    if(description.style.display =="none"||description.style.display ==""){
        description.style.display ="flex"
    }else{
        description.style.display ="none"
    }
}



let trackLoc = 0
let sub =""
let desc =""

function editTask(event){
    let task  = event.target.closest(".task")
    // let subjecte = task.querySelector(".clickSub").textContent
    let descriptione = task.querySelector(".displayDescription")
    let sr = task.querySelector(".serialNumber").textContent.trim().split(" |")[0]
    let serialNumber = parseInt(sr)
    for(i=0;i<listInfo.length;i++){
        if(i==serialNumber-1){
            let info = listInfo[i]
            sub = info.Subject
            desc = info.Description
            trackLoc = i
            break;
        }
    }
    createTask.style.display = "flex"
    taskAddBtn.style.display = "none"
    descriptione.style.display = "none"
    confirmBtn.style.display = "block"
    subject.value = sub
    description.value = desc
    console.log(sub,desc)
}



let confirmBtn = document.getElementById("confirm")
confirmBtn.addEventListener('click', function() {
    updateList(subject.value, description.value);
});
function updateList(sub, desc) {
    listInfo[trackLoc].Subject = sub;
    listInfo[trackLoc].Description = desc;
    mainContainer.innerHTML = "";
    for (let i = 0; i < listInfo.length; i++) {
        taskList(listInfo[i].Subject, listInfo[i].Description, listInfo[i].Sr);
    }
    subject.value = "";
    description.value = "";
    createTask.style.display = "none";
    confirmBtn.style.display = "none";
    taskAddBtn.style.display = "block";
    console.log(listInfo);
}

taskCancelBtn.addEventListener('click',cancel)
function cancel(){
    createTask.style.display = "none";
    if (listInfo.length == 0) {
        noTaskAvail.style.display = "flex";
    } else {
        noTaskAvail.style.display = "none";
    }
}


// let deletebtn = document.getElementById("deletebtn");
// deletebtn.addEventListener('click', remove);

// function remove() {
//     let checkboxTasks = document.querySelectorAll('.task input[type="checkbox"]');
//     let newListInfo = [];
//     checkboxTasks.forEach(function(checkbox, i) {
//         if (!checkbox.checked) {
//             newListInfo.push(listInfo[i]);
//             sahi = true
//         } else {
//             let checked = listInfo[i].Subject
//             let hlremove = highLightsInfoList[i]
//             let rdRemove = reminderInfoList[i]
//             let task = checkbox.closest('.task');
//             let li = checkbox.closest('.clickLi')
//             task.remove()
//             if(hlremove==checked||rdRemove==checked){
//                 li.remove()
//             }   
//         }
//     });
// if(sahi==false){
//     listInfo.splice(0,listInfo.length)
//     srn=0
// }
//     listInfo = newListInfo;
//     mainContainer.innerHTML = "";
//     for (let i = 0; i < listInfo.length; i++) {
//         taskList(listInfo[i].Subject, listInfo[i].Description, listInfo[i].Sr=i+1);
//         srn = i+1
//     }
//     createTask.style.display = "none";
//     // if (listInfo.length===0) {
//     //     noTaskAvail.style.display = "flex";
//     // } else {
//     //     noTaskAvail.style.display = "none";
//     // }
//     console.log(listInfo)
// }

//*********************************** */ Remove logic is written by the help of ChatGpt
let deletebtn = document.getElementById("deletebtn");
deletebtn.addEventListener('click', remove);

function remove() {
    let checkboxTasks = document.querySelectorAll('.task input[type="checkbox"]');
    let newListInfo = [];
    let updatedHighLightsInfoList = [];
    let updatedReminderInfoList = [];

    checkboxTasks.forEach(function(checkbox, i) {
        if (!checkbox.checked) {
            newListInfo.push(listInfo[i]);
            if (highLightsInfoList.includes(listInfo[i].Subject)) {
                updatedHighLightsInfoList.push(listInfo[i].Subject);
            }
            if (reminderInfoList.includes(listInfo[i].Subject)) {
                updatedReminderInfoList.push(listInfo[i].Subject);
            }
        } else {
            let task = checkbox.closest('.task');
            task.remove();

            let hlIndex = highLightsInfoList.indexOf(listInfo[i].Subject);
            if (hlIndex > -1) {
                highLightsInfoList.splice(hlIndex, 1);
            }

            let rdIndex = reminderInfoList.indexOf(listInfo[i].Subject);
            if (rdIndex > -1) {
                reminderInfoList.splice(rdIndex, 1);
            }
            let hlLi = document.querySelector(`#hl li:nth-child(${hlIndex + 1})`);
            if (hlLi) hlLi.remove();

            let rdLi = document.querySelector(`#ri li:nth-child(${rdIndex + 1})`);
            if (rdLi) rdLi.remove();
        }
    });




    listInfo = newListInfo;
    highLightsInfoList = updatedHighLightsInfoList;
    reminderInfoList = updatedReminderInfoList;

    mainContainer.innerHTML = "";
    for (let i = 0; i < listInfo.length; i++) {
        taskList(listInfo[i].Subject, listInfo[i].Description, listInfo[i].Sr = i + 1);
        srn = i + 1;
    }

    createTask.style.display = "none";
    if (listInfo.length === 0) {
        noTaskAvail.style.display = "flex";
    } else {
        noTaskAvail.style.display = "none";
    }

    console.log(listInfo);
}

let hlBtn = document.getElementById("highLightbtn");
hlBtn.addEventListener('click', highLightsTask);

function highLightsTask() {
    let checkboxTasks = document.querySelectorAll('.task input[type="checkbox"]');
    let hlInfo = document.getElementById("hl");
    hlInfo.innerHTML = ""; 
    checkboxTasks.forEach(function(checkbox, i) {
    if (checkbox.checked) {
        highLightsInfoList.push(listInfo[i].Subject);
        let li = document.createElement("li");
        li.className = "clickLi";
        li.innerHTML = listInfo[i].Subject;
        hlInfo.appendChild(li);
        checkbox.checked = false;
        li.addEventListener('click', function() {
    let taskElement = document.getElementById("task-" + (i + 1));
    if (taskElement) {
        taskElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        taskElement.classList.add("highlighted");
        }
        })
        }
    });

    document.getElementById("hlNo").style.display = "none";
}



document.getElementById("searchBtn").addEventListener('click',searchTask)
function searchTask(){
    let nahiMilla = false
    if(document.getElementById("search").value==""){
        alert("input field cannot be empty")
    }else{

    let search = document.getElementById("search").value
    for(i=0;i<listInfo.length;i++){
        if(search.toLowerCase()==listInfo[i].Subject){
            let taskElement = document.getElementById("task-" + (i + 1));
            taskElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            nahiMilla = true
            break;
        }
    }
    if(nahiMilla == false){
        alert("task nahi mila")
    }
    document.getElementById("search").value = ""
}
}


TodoList.addEventListener('click',function(){
    mainContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
})

addBtn.addEventListener('click',function(){
    if(createTask.style.display == "none"|| createTask.style.display == ""){
        createTask.style.display = "flex"
        createTask.scrollIntoView({ behavior: 'smooth', block: 'start' });
        noTaskAvail.style.display = "none"
    }else{
        createTask.style.display = "none"
    }
})


let reminderbtn1 = document.getElementById("reminderbtn1");
reminderbtn1.addEventListener('click', reminderTask);
let countReminder = 0;

function reminderTask() {
    let checkboxTasks = document.querySelectorAll('.task input[type="checkbox"]');
    let riInfo = document.getElementById("ri");
    riInfo.innerHTML = ""; 
    checkboxTasks.forEach(function(checkbox, i) {
    if (checkbox.checked) {
         countReminder++;
        reminderInfoList.push(listInfo[i].Subject);
        let li = document.createElement("li");
         li.className = "clickLi";
         li.innerHTML = listInfo[i].Subject;
         riInfo.appendChild(li);
         checkbox.checked = false;

    li.addEventListener('click', function() {
        let taskElement = document.getElementById("task-" + (i + 1));
        if (taskElement) {
           taskElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                taskElement.classList.add("reminders");
     }
      });
        }
    });

if (countReminder > 0) {
    let timerString = prompt("Enter time in which you want to be reminded (e.g., 'minutes','seconds', 'hours')").toLowerCase();
    let time = 0;

switch (timerString) {
    case "seconds":
         time = prompt("Enter Seconds");
         time = parseInt(time) * 1000; 
         break;
     case "minutes":
         time = prompt("Enter Minutes");
        time = parseInt(time) * 60000; 
         break;
    case "hours":
        time = prompt("Enter Hours");
        time = parseInt(time) * 3600000;
        break;
    default:
        alert("Check your spelling.");
        return;
        }

    if (time > 0) {
        setTimeout(() => {
            alert("You have " + countReminder + " tasks to do. Go and check the Reminderssection.");
        }, time);
        } else {
            alert("Invalid time entered.");
        }
    } else {
        alert("No tasks selected for reminders.");
    }
}
