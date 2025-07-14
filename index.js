let toDoList = [];

let inputValue;
let toDoInput = document.getElementById("todo-input");
toDoInput.addEventListener("change", function (event){
   inputValue = event.target.value;
});

let priInputValue;
let toDoPriInput = document.getElementById("todo-pri-input");
toDoPriInput.addEventListener("change", function (event){
    priInputValue = event.target.value;
});

let toDoDOM = document.getElementById("to-do-list");

let addButton = document.getElementById("add-button");
addButton.addEventListener("click",addToDo);

let cleanButton = document.getElementById("clean-button");
cleanButton.addEventListener("click",clean);

function addToDo(e) {
    e.preventDefault();
    if(typeof inputValue == undefined || inputValue == ""){
        inputValue = "None";
    }
    if(isNaN(priInputValue) || Number(priInputValue) < 1 || Number(priInputValue) > 4){
        priInputValue = "0";
    }

    toDoList.unshift({"no": toDoList.length+1, "value": inputValue, "pri": parseInt(priInputValue)} );
    inputValue = "";
    priInputValue = "";
    toDoInput.value = "";
    toDoPriInput.value = "";
    toDoListSort();
    display();
}


function deleteToDo(no) {
    for(let index in toDoList){
        if(toDoList[index]["no"] == no){
            toDoList.splice(index,1);
        }
    }
    display();
}


function clean(e) {
    e.preventDefault();
    while(toDoList.length > 0){
      toDoList.pop();
    }
    display();
}

function toDoListSort() {
    let temp;
    for(let i = 0; i < toDoList.length; i++){
       for (let j = i+1; j < toDoList.length; j++){
          if(toDoList[i]["pri"] < toDoList[j]["pri"]){
            temp = toDoList[i];
            toDoList[i] = toDoList[j];
            toDoList[j] = temp;
          }
       }
    }
}


function display() {
    if(toDoList.length == 0){
      toDoDOM.innerHTML = "<h1>Liste boş!</h1>";
    } 
    else{
        let tdlHtml = ""; 
        toDoList.forEach(element => {
        switch (element.pri) {
            case 4:
                tdlHtml += `
                  <div class="card bgc-fpri">
                  <span>${element.value}</span>  <span>Öncelik Seviyesi: ${element.pri}</span>
                  
                `
                break;
            
            case 3:
                tdlHtml += `
                  <div class="card bgc-spri">
                   <span>${element.value}</span>  <span>Öncelik Seviyesi: ${element.pri}</span>
                  
                `
                break;

            case 2:
                tdlHtml += `
                  <div class="card bgc-tpri">
                   <span>${element.value}</span>  <span>Öncelik Seviyesi: ${element.pri}</span>
                  
                `
                break; 

            case 1:
                tdlHtml += `
                  <div class="card bgc-lpri">
                   <span>${element.value}</span>  <span>Öncelik Seviyesi: ${element.pri}</span>
                  
                `
                break;   

            default:
                tdlHtml += `
                  <div class="card" style="background-color: gray;">
                   <span>${element.value}</span>  <span>Öncelik Seviyesi: None</span>
                  
                `
                break;    
        }
        tdlHtml += `<button class="delete-button" onclick="deleteToDo(${element.no})">Sil</button> </div>`;
    });
    toDoDOM.innerHTML = tdlHtml; 
    }
     
}