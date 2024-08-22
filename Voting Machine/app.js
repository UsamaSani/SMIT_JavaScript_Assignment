let leaderInfo = []
function addLeader(){
    document.getElementById("main").innerHTML = ""
    let name = document.getElementById("name").value;
    let vote = document.getElementById("rv").value;
    let sr = 0;
    let voteCount = 0;
    let addleaderInfo ={
        SR : sr,
        Name : name,
        Vote : vote,
        voteCount : voteCount
    }
    if(name == "" || vote == ""){
        document.getElementById("warning").innerText = "Please fill the input field first"
    }else{
    leaderInfo.push(addleaderInfo)
    document.getElementById("name").value = ""
    document.getElementById("rv").value = ""
    document.getElementById("warning").innerText = ""
    console.log(leaderInfo)
    }
    for(i=0;i<leaderInfo.length;i++){
        let linfo = leaderInfo[i]
        sr = i+1
        linfo.SR = sr
        displayCard(linfo.SR,linfo.voteCount,linfo.Vote,linfo.Name)
    }
}
document.getElementById("add").addEventListener('click',addLeader)

function displayCard(sr,voteCount,vote,name){
    let card = document.createElement("div")
    card.className = "card"
    card.innerHTML = `
            <div class="sr"><p>SR N0: <span>${sr}</span></p></div>
            <h1 class="lname">${name}</h1>
            <p class="vote">Vote For</p>
            <span>${vote}</span>
            <span class ="voteCount">${voteCount}</span>
            <div class ="btndiv">
            <button class = "voteBtn">Vote</button>
            <button class = "dhandli">Dhandli</button>
            <button class = "reset">reset</button>
            </div>
            `;
    document.getElementById("main").appendChild(card);
    card.querySelector(".voteBtn").addEventListener('click',countVote)
    card.querySelector(".dhandli").addEventListener('click',dhandli)
    card.querySelector(".reset").addEventListener('click',reset)
}
function countVote(event){
    const card = event.target.closest('.card');
    const voteCountvalue = card.querySelector('.voteCount');
    let count = parseInt(voteCountvalue.textContent, 10);
    count++;
    voteCountvalue.textContent = count;
  }
  function dhandli(event){
    const card = event.target.closest('.card');
    const voteCountvalue = card.querySelector('.voteCount');
    let count = parseInt(voteCountvalue.textContent, 10);
    if(count > 0){

        count--;
    }
    voteCountvalue.textContent = count;
  }
  function reset(event){
    const card = event.target.closest('.card');
    const voteCountvalue = card.querySelector('.voteCount');
    voteCountvalue.textContent = "0";
  }
  