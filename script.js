const todoForm = document.querySelector('form');
const todoInput = document.querySelector('#todo-input');
const todoListUL = document.querySelector('.todo-list');
const colorPicker = document.querySelector('#color-change')
const uName = document.querySelector('.uname')
colorPicker.addEventListener('input',()=>{
    document.documentElement.style.setProperty('--accent-color',colorPicker.value)
    localStorage.setItem('theame_color',colorPicker.value)
})



let allTodos = getTodos();
let editIndex = null;  
let isEditing = false;


window.onload = function(){
    const nameBtn = document.querySelector('.name-btn');
    const nameinp = document.querySelector('.name-inp');
    const nameCon = document.querySelector('.user-name-con');
    const overlay = document.querySelector('.overlay');
    
    const saverColor = localStorage.getItem('theame_color');
    if(saverColor){
        colorPicker.value = saverColor;
        document.documentElement.style.setProperty('--accent-color',saverColor)
    }else{
        const defaultColor = "#00ccff";
        colorPicker.value = defaultColor;
    }
    
    const savedName = localStorage.getItem('userName');
    if (savedName) uName.innerText = 'Hi,' + savedName + '💖';

    let isUserNameSet = localStorage.getItem('isUserNameSet') === 'true';

    if(!isUserNameSet){
        nameCon.classList.add('showName');
        overlay.classList.add('active')
    }
    nameBtn.addEventListener('click',()=>{
        if(nameinp.value.length > 0){
            confetti(
                {
                    particleCount: 120,
                    startVelocity: 30,
                    spread: 360,
                    origin: {
                        x: Math.random(),
                        // since they fall down, start a bit higher than random
                        y: Math.random() - 0.2
                    }
                }
            )
             confetti(
                {
                    particleCount: 120,
                    startVelocity: 30,
                    spread: 360,
                    origin: {
                        x: Math.random(),
                        // since they fall down, start a bit higher than random
                        y: Math.random() - 0.2
                    }
                }
            )
             confetti(
                {
                    particleCount: 120,
                    startVelocity: 30,
                    spread: 360,
                    origin: {
                        x: Math.random(),
                        // since they fall down, start a bit higher than random
                        y: Math.random() - 0.2
                    }
                }
            )
            uName.innerText = 'Hi,' + nameinp.value + '💖';
            nameCon.classList.remove('showName');
            overlay.classList.remove('active');
            localStorage.setItem('isUserNameSet','true')
            this.localStorage.setItem('userName',nameinp.value)
        }
    })
}


updateTodoList()
todoForm.addEventListener('submit',function(e){
    e.preventDefault();
    addTodo()
})


function addTodo(){
    const todoText = todoInput.value.trim();
    if(todoText.length === 0) return;

    if(isEditing){
        allTodos[editIndex].text = todoText;
        isEditing = false;
        editIndex = null;
        document.querySelector('#add-button').textContent = 'ADD';
    }else{
        const todoObject = {
            text: todoText,
            completed: false
        }
        allTodos.push(todoObject);
        
    }
    updateTodoList()
    saveTodos()
    todoInput.value = '';
}

function updateTodoList(){
    todoListUL.innerHTML = '';
    allTodos.forEach((todo,todoIndex)=>{
        const todoLI = document.createElement('li');
        const todoText = todo.text;
        todoLI.className = 'todo';
        todoLI.innerHTML = `
        <input type="checkbox" name="" id="todo-${todoIndex}">
            <label for="todo-${todoIndex}" class="custom-checkbox">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="transparent"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
            </label>
            <label for="todo-${todoIndex}" class="todo-text">${todoText}</label>
            <button class="edit-button">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="20px" fill="var(--secodary-color)"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
            </button>
            <button class="delete-button">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--secodary-color)"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
            </button>
        `
        const deleteButton = todoLI.querySelector('.delete-button');
        deleteButton.addEventListener('click',()=>{
            deleteTodoItem(todoIndex)
        })
        todoListUL.append(todoLI)
        const checkbox = todoLI.querySelector('input');
        checkbox.addEventListener('change',()=>{
            allTodos[todoIndex].completed = checkbox.checked;
            saveTodos()
        })
        checkbox.checked = todo.completed;
        
        const edit = todoLI.querySelector('.edit-button');
        edit.addEventListener('click',()=>{
            todoInput.focus()
            todoInput.value = todo.text;
            editIndex = todoIndex;
            isEditing = true;

            document.querySelector('#add-button').textContent = 'UPDATE';

        })
    })
}
function deleteTodoItem(todoIndex){
    allTodos.splice(todoIndex,1)
    saveTodos()
    updateTodoList()
}

function saveTodos(){
    const todosJson = JSON.stringify(allTodos)
    localStorage.setItem("todos",todosJson)
}

function getTodos(){
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}