'use strict'
const inputTask = document.getElementById('input-task')
const btnAdd = document.getElementById('btn-add')
const todoList = document.getElementById('todo-list')

const todoArr = getTodoListStorage() ? getTodoListStorage() : [] //Lấy todoList từ localStorage
renderTodo() // Render lại todoList

const currentUser = JSON.parse(localStorage.getItem('currentUser')) //Lấy ra người dùng hiện tại từ localStorage

// Chuyển đổi currentUser về dạng Class Instance
currentUser.forEach((userData, index) => {
    const user = new User(userData.Firstname, userData.Lastname, userData.Username, userData.Password)
    currentUser[index] = user
})
console.log(todoArr)

const isDone = false

//Hàm renderTodo ra giao diện
function renderTodo() {
    todoList.innerHTML = ''
    todoArr.map((todo, index) => {
        const row = document.createElement('li')
        row.innerHTML = `
    <li>
        ${todo.task}
        <span class="close" onclick="deleteTodo(${index})">×</span>
    </li>
    `
        if (todo.isDone == true) {
            row.setAttribute('class', 'checked')
        }

        //Xử lý sự kiện khi ấn vào để hoàn thành task
        row.addEventListener('click', function() {
            if (todo.isDone == false) {
                this.classList.toggle('checked')
                todo.isDone = true
                saveTodoListStorage() //Lưu giá trị isDone vào localStorage
                console.log(todoArr)
            } else {
                this.classList.toggle('checked')
                todo.isDone = false
                saveTodoListStorage() //Lưu giá trị isDone vào localStorage
                console.log(todoArr)
            }
        })
        todoList.appendChild(row)
    })
}

//Hàm xóa todo
function deleteTodo(index) {
    todoArr.splice(index, 1)
    renderTodo()
}

//Hàm add todo
function addTodo() {
    let val = inputTask.value.trim()
    if (val) {
        //Tạo Instance từ class Task
        const listTasks = new Task(
            inputTask.value,
            currentUser[0].Username,
            isDone
        )
        todoArr.push(listTasks)
        saveTodoListStorage()
        renderTodo()
        inputTask.value = ''
        console.log(todoArr)
    }
}

//Bắt sự kiện nút add
btnAdd.addEventListener('click', addTodo)
document.addEventListener('keydown', (e) => {
    if (e.keyCode == 13) {
        addTodo()
    }
})