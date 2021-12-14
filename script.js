//Clock Function Here//
function time(){
    var date = new Date();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var seconds = date.getSeconds();
    var period = "";
    if(hour >= 12){
        period = "PM";
    } else {
        period = "AM";
        
    }
    if (hour == 0) {
        hour = 12;
        } else {
        if (hour > 12) {
        hour = hour - 12;
        }
    }
        hour = update(hour);
        minute = update(minute);
        seconds = update(seconds);
        document.getElementById("digitalClock").innerText = hour + " : " + minute + " : " + seconds + " " + period;
        setTimeout( time, 1000); 
        function update(t) {
            if (t < 10) {
            return "0" + t;
            }
            else {
            return t;
            }
        }
    }
function date(){
    var monthName = ["January", "February", "March" , "April" , "May", "June", "July", "August", "September", "October", "November", "December"];
    var date = new Date();
    var numDay = date.getDate();
    var month = monthName[date.getMonth()];
    var year = date.getFullYear();
    document.getElementById("date").innerText = month + " "+ numDay + " " + year;
}
function greetings(){
    var date = new Date();
    var hour = date.getHours();
    var word = "";
    if(hour >= 4 && hour < 12){
        word = "Good Morning Daniel";
    } else if (hour >= 12 && hour <= 16){
        word  = "Good Afternoon Daniel";
    } else{
        word = "Good Evening Daniel";
    }
    document.getElementById("webHeader").innerText = word;
}
greetings();
time();
date();
//------------------------------------------------To do list---------------------------------------------------------------------------------------------------//
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
//event listeners
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click', addtoDo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click',filterTodo);
//functions
function addtoDo(event){
    event.preventDefault();
    //todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    if(todoInput.value === ""){
        alert("Please enter a task!");
        return false;
    }
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //save local todos
    saveLocalTodos(todoInput.value);
    //CheckMark bttn
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class = "fas fa-check"></i>';
    completedButton.classList.add("completed-bttn");
    todoDiv.appendChild(completedButton);
    //Delete Bttn
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class = "fas fa-trash"></i>';
    deleteButton.classList.add('delete-bttn');
    todoDiv.appendChild(deleteButton);
    // appendtolist
    todoList.appendChild(todoDiv);
    todoInput.value = "";
}
function deleteCheck(e){
    const item = e.target;
    if (item.classList[0] === 'delete-bttn'){
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function(){
            todo.remove();
        })
    }
    if (item.classList[0] === 'completed-bttn'){
        const todo= item.parentElement;
        todo.classList.toggle('completed');
    }
}
function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "unfinished":
                if(!todo.classList.contains("completed")){
                    todo.style.display = 'flex';

                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    })

}
function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}
function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //CheckMark bttn
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class = "fas fa-check"></i>';
    completedButton.classList.add("completed-bttn");
    todoDiv.appendChild(completedButton);
    //Delete Bttn
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class = "fas fa-trash"></i>';
    deleteButton.classList.add('delete-bttn');
    todoDiv.appendChild(deleteButton);
    // appendtolist
    todoList.appendChild(todoDiv);
    });

}
function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));

}
