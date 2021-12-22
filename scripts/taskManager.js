document.addEventListener("DOMContentLoaded", dud)

var inptBox;
var button;
var todoList;

function dud()
{
  inptBox = document.querySelector(".task-form input");
  button = document.querySelector(".task-form button");
  todoList = document.querySelector(".todoList");

  showTasks();

  inptBox.onkeyup = () => {
    let userData = inptBox.value;
    if (userData.trim() != 0)
    {
        button.classList.add("active");
    }
    else
    {
        button.classList.remove("active");
    }
  }
  
  button.onclick = () => { 
  
    let userEnteredValue = inptBox.value; 
  
    let getLocalStorageData = localStorage.getItem("New Todo");
    if(getLocalStorageData == null || getLocalStorageData.length == 0){
      listArray = [];
    }else{
      listArray = JSON.parse(getLocalStorageData); 
    }
    
    listArray.push(userEnteredValue); 
    localStorage.setItem("New Todo", JSON.stringify(listArray)); 
    showTasks();
    button.classList.remove("active");
  }
}


function showTasks(){
  let getLocalStorageData = localStorage.getItem("New Todo");
  if(getLocalStorageData == null || getLocalStorageData.length == 0){
    listArray = [];
  }else{
    listArray = JSON.parse(getLocalStorageData); 
  }
  let newLiTag = "";
  listArray.forEach((element, index) => {
    newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"></span></li>`;
  });
  todoList.innerHTML = newLiTag;
  inptBox.value = "";
}

function deleteTask(index){
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1);
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks();
}