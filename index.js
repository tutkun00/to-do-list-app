//Storage Class'ı (Local Storage'a verileri kaydetmek için)
class Storage {
    static setStorage(tdlist){
       let storage = localStorage.setItem("todo", JSON.stringify(tdlist));
       return storage;
    }
    static getStorage(){
       let storage = localStorage.getItem("todo") === null ? [] : JSON.parse(localStorage.getItem("todo"));
       return storage;
    }
}


//To-do List Class'ı 
class ToDoList {

    toDoList;

    constructor(tdl) {
      this.toDoList = tdl;
    }

    toDoListSort() {
    let temp;
    for(let i = 0; i < this.toDoList.length; i++){
       for (let j = i+1; j < this.toDoList.length; j++){
          if(this.toDoList[i]["pri"] > this.toDoList[j]["pri"]){
            temp = this.toDoList[i];
            this.toDoList[i] = this.toDoList[j];
            this.toDoList[j] = temp;
          }
       }
    }
}


    addToDo(e, inputValue, priInputValue) {
    e.preventDefault();
    if(typeof inputValue == undefined || inputValue == ""){
        UI.giveAlert("Lütfen yapılacak iş bölümünü boş bırakmayınız.");
        return;
    }
    if(isNaN(priInputValue) || Number(priInputValue) < 1 || Number(priInputValue) > 4){
        priInputValue = "10";
    }
    this.toDoList.unshift({"no": this.toDoList.length+1, "value": inputValue, "pri": parseInt(priInputValue)} );
    console.log(this.toDoList);
    this.toDoListSort();
    UI.display(this.toDoList);
    Storage.setStorage(this.toDoList);
}


    deleteToDo(no) {
    for(let index in this.toDoList){
        if(this.toDoList[index]["no"] == no){
            this.toDoList.splice(index,1);
        }
    }
    UI.display(this.toDoList);
    Storage.setStorage(this.toDoList);
} 

   
    clean(e) {
    e.preventDefault();
    while(this.toDoList.length > 0){
      this.toDoList.pop();
    }
    UI.display(this.toDoList);
    Storage.setStorage(this.toDoList);
}
    
}

//To-do ları gösteren ve eksik bilgi girildiğinde alert verilmesi için UI Class'ı
class UI {
    static display(tdlist){
       if(tdlist.length == 0){
      let blank = '<div class="blank-container-p">Listenizde öğe bulunmuyor.</div><div class="blank-container-g"><span style="font-weight: bold;">Bilgilendirme</span> Soldaki kısma kaydetmek istediğiniz "yapılacak işi" sağdaki kısma ise 1 ile 4 arası olacak şekilde öncelik numarası giriniz.Öncelik numarası girmeden de işlerinizi kaydedebilirsiniz.</div>';  
      toDoDOM.innerHTML = blank;
    } 
    else{
        let tdlHtml = ""; 
        tdlist.forEach(element => {
        switch (element.pri) {
            case 1:
                tdlHtml += `
                  <div class="card bgc-fpri">
                  <span>${element.value}</span>  <span>Öncelik Seviyesi: ${element.pri}</span>
                  
                `
                break;
            
            case 2:
                tdlHtml += `
                  <div class="card bgc-spri">
                   <span>${element.value}</span>  <span>Öncelik Seviyesi: ${element.pri}</span>
                  
                `
                break;

            case 3:
                tdlHtml += `
                  <div class="card bgc-tpri">
                   <span>${element.value}</span>  <span>Öncelik Seviyesi: ${element.pri}</span>
                  
                `
                break; 

            case 4:
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
        tdlHtml += `<button class="delete-button" onclick="toDoList.deleteToDo(${element.no})">Sil</button> </div>`;
    });
    toDoDOM.innerHTML = tdlHtml; 
    }
    }
    

    static giveAlert(text){
      window.alert(text);
    }
}

//To-do nesnesi oluşturma
const toDoList = new ToDoList(Storage.getStorage());
//Local Storage'daki çekilen verileri sayfa açıldığında ekranda gösterme
window.addEventListener("DOMContentLoaded", function(){
   UI.display(toDoList.toDoList);
});
//Input elementlerini seçme
let inputValue;
let toDoInput = document.getElementById("todo-input");

let priInputValue;
let toDoPriInput = document.getElementById("todo-pri-input");


let toDoDOM = document.getElementById("to-do-list");


let addButton = document.getElementById("add-button");
addButton.addEventListener("click", function(e){
    inputValue = toDoInput.value;
    priInputValue = toDoPriInput.value;
    toDoList.addToDo(e,inputValue,priInputValue);
    inputValue = "";
    priInputValue = "";
    toDoInput.value = "";
    toDoPriInput.value = "";
});

let cleanButton = document.getElementById("clean-button");
cleanButton.addEventListener("click", function(e){
    toDoList.clean(e);
});

//---------------------------------------------------------------------------------------
//Yukarıdaki kısım bu kısmın daha modüler hali ve Local Storage'da veri alışverişi eklenmiş kısmıdır.

// let toDoList = [];

// let inputValue;
// let toDoInput = document.getElementById("todo-input");
// toDoInput.addEventListener("change", function (event){
//    inputValue = event.target.value;
// });

// let priInputValue;
// let toDoPriInput = document.getElementById("todo-pri-input");
// toDoPriInput.addEventListener("change", function (event){
//     priInputValue = event.target.value;
// });

// let toDoDOM = document.getElementById("to-do-list");

// let addButton = document.getElementById("add-button");
// addButton.addEventListener("click",addToDo());

// let cleanButton = document.getElementById("clean-button");
// cleanButton.addEventListener("click",clean);

// function addToDo(e) {
//     e.preventDefault();
//     if(typeof inputValue == undefined || inputValue == ""){
//         inputValue = "None";
//     }
//     if(isNaN(priInputValue) || Number(priInputValue) < 1 || Number(priInputValue) > 4){
//         priInputValue = "0";
//     }

//     toDoList.unshift({"no": toDoList.length+1, "value": inputValue, "pri": parseInt(priInputValue)} );
//     inputValue = "";
//     priInputValue = "";
//     toDoInput.value = "";
//     toDoPriInput.value = "";
//     toDoListSort();
//     display();
// }


// function deleteToDo(no) {
//     for(let index in toDoList){
//         if(toDoList[index]["no"] == no){
//             toDoList.splice(index,1);
//         }
//     }
//     display();
// }


// function clean(e) {
//     e.preventDefault();
//     while(toDoList.length > 0){
//       toDoList.pop();
//     }
//     display();
// }

// function toDoListSort() {
//     let temp;
//     for(let i = 0; i < toDoList.length; i++){
//        for (let j = i+1; j < toDoList.length; j++){
//           if(toDoList[i]["pri"] < toDoList[j]["pri"]){
//             temp = toDoList[i];
//             toDoList[i] = toDoList[j];
//             toDoList[j] = temp;
//           }
//        }
//     }
// }


// function display() {
//     if(toDoList.length == 0){
//       toDoDOM.innerHTML = "<h1>Liste boş!</h1>";
//     } 
//     else{
//         let tdlHtml = ""; 
//         toDoList.forEach(element => {
//         switch (element.pri) {
//             case 4:
//                 tdlHtml += `
//                   <div class="card bgc-fpri">
//                   <span>${element.value}</span>  <span>Öncelik Seviyesi: ${element.pri}</span>
                  
//                 `
//                 break;
            
//             case 3:
//                 tdlHtml += `
//                   <div class="card bgc-spri">
//                    <span>${element.value}</span>  <span>Öncelik Seviyesi: ${element.pri}</span>
                  
//                 `
//                 break;

//             case 2:
//                 tdlHtml += `
//                   <div class="card bgc-tpri">
//                    <span>${element.value}</span>  <span>Öncelik Seviyesi: ${element.pri}</span>
                  
//                 `
//                 break; 

//             case 1:
//                 tdlHtml += `
//                   <div class="card bgc-lpri">
//                    <span>${element.value}</span>  <span>Öncelik Seviyesi: ${element.pri}</span>
                  
//                 `
//                 break;   

//             default:
//                 tdlHtml += `
//                   <div class="card" style="background-color: gray;">
//                    <span>${element.value}</span>  <span>Öncelik Seviyesi: None</span>
                  
//                 `
//                 break;    
//         }
//         tdlHtml += `<button class="delete-button" onclick="deleteToDo(${element.no})">Sil</button> </div>`;
//     });
//     toDoDOM.innerHTML = tdlHtml; 
//     }
     
// }