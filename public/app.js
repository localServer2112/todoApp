// (use 'esversion: 6');
// selectors
const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const delList = document.querySelector('.del-list');
const doneList = document.querySelector('.done-list');
const filterAll = document.querySelector('.all');
const filterDone = document.querySelector('.complete');
const filterUndone = document.querySelector('.uncomplete');
// Event Listeners
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click',deleteSelected);
// filterAll.addEventListener('click',filterTodo);
// filterDone.addEventListener('click',filterTodo);
// filterUndone.addEventListener('click',filterTodo);
window.addEventListener('load',showTodos);
// Functions

async function getAllTodos() 
{
  let response = await fetch(`http://todo-app2112.herokuapp.com/todos`);
  let data = await response.json();
   return data;
}

function showTodos(){
    getAllTodos().then(
        _data => {
           _data.map((el) => {
               if (el.status == "Done") {
                   createTodoItem(el.title,"completed");
               }else{
               createTodoItem(el.title,"");
               }
           });
           }
       );
}

async function getLastTodo(){
    await (await fetch(`http://todo-app2112.herokuapp.com/todos/1`)).json()
    .then(
        _data => {
            createTodoItem(el.title);
        });
}

async function setAllFilter(){
    // getAllTodos
}

function createTodoItem(text,todo_class) {
         // todo div
         const todoDiv = document.createElement("div");
         todoDiv.classList.add('todo');
         todoDiv.classList.add(todo_class);
         // check mark buttons
         const completedBtn = document.createElement("button");
         completedBtn.innerHTML= '<i class="fa fa-check"></i>';
         completedBtn.classList.add("completed-btn");
         // tash btn
         const trashBtn = document.createElement("button");
         trashBtn.innerHTML= '<i class="fa fa-trash"></i>';
         trashBtn.classList.add("trash-btn");
         // create Li
         const newTodo = document.createElement("li");
         newTodo.innerText = text;
         newTodo.classList.add("todo-item");
         todoDiv.appendChild(newTodo);
         
         todoDiv.appendChild(completedBtn);
         
         todoDiv.appendChild(trashBtn);
         // append all to list
         todoList.appendChild(todoDiv);
         console.log('fetched all...');
}


async function addTodo(event){
    event.preventDefault();// prevent from submitting
    
    if (todoInput.value === "") {
        alert("Cannot add empty todo");
    } else {
        
        // use the fetch API to add the todo to the database using the API endpoint...
        const data = {
            title : todoInput.value,
        }     ;  
        const todoOption = {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(data)
        };
        const response = await fetch('/todos',todoOption);
        const resData = await response.json()
        .then(
                _data => {
                    todoInput.value = "";
                    alert('added successfully');
                    
                    
                   }
               );
               getLastTodo();
              // return data;
        
            
        
//      end fetchAPI post data

    }
} 
async function deleteItem(_title){
    let data = _title.toString();
    const del_item = await fetch('/todos/'+ data,
     {method: 'DELETE',
    });
    return del_item;
}
async function deleteSelected(evt){
    const item = evt.target;
    // delete todo
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        console.log();
        // use the fetchApi to delete the selected itm..
        // use the fetch API to add the todo to the database using the API endpoint...
        // const data = {
        //     title : 
        // }       
       deleteItem(todo.childNodes[0].innerText)
        .then((el) => {
            todo.classList.add("del-fade"),
            todo.addEventListener("transitionend",() =>{// execute after transition ends
                todo.remove();
                });
            }
       );  
        //      end fetchAPI delete data
    }
    
    // complete todo
    if(item.classList[0] === "completed-btn"){
        var todo = item.parentElement;
        var data = {
            status : "Done",
            title : todo.childNodes[0].innerText,
        };       
        var todoOption = {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(data)
        };
        var response = await fetch('/todos',todoOption);
        await response.json().
        then( (el)=>{
             const todo = item.parentElement;
            todo.classList.toggle("completed");
        }
               
            
        );
    }
}
function delTodo(todo){
    // todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add('todo');
        // create Li
        const newTodo = document.createElement("li");
        newTodo.classList.add("todo-item");
        newTodo.innerText = todo;
        todoDiv.appendChild(newTodo);
        
    console.log(todoDiv);
        // append all to list
        delList.appendChild(todoDiv);
    
}
function generate_id(){
    return Math.random().toString(36).substring(2, 15);
}