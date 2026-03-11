const API_BASE = "https://your-api.azurewebsites.net";

async function loadMatches(){

const res = await fetch(API_BASE + "/matches/today");
const matches = await res.json();

const dropdown = document.getElementById("match");

if(!dropdown) return;

matches.forEach(m => {

let opt = document.createElement("option");
opt.value = m.match_name;
opt.text = m.match_name;

dropdown.appendChild(opt);

});

}

async function submitPrediction(){

const data = {
user: document.getElementById("user").value,
match: document.getElementById("match").value,
prediction: document.getElementById("prediction").value,
bold: document.getElementById("bold").checked,
timestamp: new Date()
};

await fetch(API_BASE + "/prediction",{

method:"POST",
headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(data)

});

document.getElementById("status").innerText="Prediction Submitted";

}

async function loadApprovals(){

const table=document.getElementById("approvalTable");

if(!table) return;

const res=await fetch(API_BASE+"/predictions/pending");

const data=await res.json();

data.forEach(p=>{

let row=table.insertRow();

row.insertCell(0).innerText=p.user;
row.insertCell(1).innerText=p.match;
row.insertCell(2).innerText=p.prediction;
row.insertCell(3).innerText=p.bold;

let btn=document.createElement("button");

btn.innerText="Approve";

btn.onclick=()=>approvePrediction(p.id);

row.insertCell(4).appendChild(btn);

});

}

async function approvePrediction(id){

await fetch(API_BASE+"/approve/"+id,{method:"POST"});

location.reload();

}

async function loadResults(){

const table=document.getElementById("resultsTable");

if(!table) return;

const res=await fetch(API_BASE+"/predictions/approved");

const data=await res.json();

data.forEach(p=>{

let row=table.insertRow();

row.insertCell(0).innerText=p.user;
row.insertCell(1).innerText=p.match;
row.insertCell(2).innerText=p.prediction;

let correct=document.createElement("button");
correct.innerText="Correct";

correct.onclick=()=>setResult(p.id,true);

let wrong=document.createElement("button");
wrong.innerText="Wrong";

wrong.onclick=()=>setResult(p.id,false);

let cell=row.insertCell(3);

cell.appendChild(correct);
cell.appendChild(wrong);

});

}

async function setResult(id,result){

await fetch(API_BASE+"/result",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({id:id,correct:result})

});

location.reload();

}

async function loadLeaderboard(){

const table=document.getElementById("leaderboardTable");

if(!table) return;

const res=await fetch(API_BASE+"/leaderboard");

const data=await res.json();

data.forEach(p=>{

let row=table.insertRow();

row.insertCell(0).innerText=p.user;
row.insertCell(1).innerText=p.score;

});

}

loadMatches();
loadApprovals();
loadResults();
loadLeaderboard();
