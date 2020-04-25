
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
filterAll.addEventListener('click',filterTodo);
filterDone.addEventListener('click',filterTodo);
filterUndone.addEventListener('click',filterTodo);
// Functions
async function addTodo(event){
    event.preventDefault();// prevent from submitting
    
    
    
    if (todoInput.value === "") {
        alert("Cannot add empty todo");
    } else {
        
        // use the fetch API to add the todo to the database using the API endpoint...
        const data = {
            title : todoInput.value
        }       
        const todoOption = {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(data)
        };
        const response = await fetch('/todos',todoOption);
        const resData = response.json();
        console.log(resData);
        if (resData.status === 200) {
            // todo div
            const todoDiv = document.createElement("div");
            todoDiv.classList.add('todo');
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
            newTodo.innerText = todoInput.value;
            newTodo.classList.add("todo-item");
            todoDiv.appendChild(newTodo)
            
            todoDiv.appendChild(completedBtn)
            
            todoDiv.appendChild(trashBtn)
            // append all to list
            todoList.appendChild(todoDiv)
            todoInput.value = "";
            console.log('todo added')
        }
        
//      end fetchAPI post data

    }
} 

function deleteSelected(evt){
    const item = evt.target;
    // delete todo
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        todo.classList.add("del-fade");

// use the fetchApi to delete the selected itm..
 // use the fetch API to add the todo to the database using the API endpoint...
 const data = {
    title : todoInput.value
}       
const todoOption = {
    method : 'POST',
    headers : {
        'Content-Type' : 'application/json'
    },
    body : JSON.stringify(data)
};
fetch('/todo',todoOption);
//      end fetchAPI post data
        todo.addEventListener("transitionend",()=>{ // execute after transition ends
            
           todo.remove();
            
        })
    }
    // complete todo
    if(item.classList[0] === "completed-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
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
        
    console.log(todoDiv)
        // append all to list
        delList.appendChild(todoDiv);
    
} 
function doneTodo(todo){
    // todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add('todo');
        // create Li
        const newTodo = document.createElement("li");
        newTodo.classList.add("todo-item");
        newTodo.innerText = todo;
        todoDiv.appendChild(newTodo);
        
    console.log(todoDiv)
        // append all to list
        doneList.appendChild(todoDiv);
    
} 
function filterTodo(e){
    // console.log(e.target.innerText)
    const todos = todoList.childNodes;
    todos.forEach((todo)=>{
            switch(e.target.innerText){
                case 'All':
                    console.log("All Todos")
                    break;
                case 'Completed':
                    let gh = []
                    let vr = todo.classList.values();
                    for (const value of vr) {
                        gh.push(value);
                    }
                    console.log(gh)
                    // console.log(todo.classList.add('d-none'))

                    // if(todo.classList.value === "completed"){
                    //     todo.style.display = 'flex';
                    // }else
                    // {
                    //     todo.style.display = 'none';
                    // }
                    break;
                case 'Uncompleted':
                    
                    console.log("Undone Todos")
                    break;
                }
    })
        
    //     }
    //     if(el.classList.contains("all")){
    //         console.log(el.innerText)
    //     }
    //     if(el.classList.contains("uncomplete")){
    //         console.log(el.innerText)
    //     }
       
    // })
}