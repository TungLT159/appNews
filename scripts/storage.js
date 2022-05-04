'use strict'
//Hàm lưu list user xuống localStorage
function saveUserStorage() {
    const userStorage = []
    userArr.forEach((userData, index) => {
        let dataStorage = {
            Firstname: userData.Firstname,
            Lastname: userData.Lastname,
            Username: userData.Username,
            Password: userData.Password
        }
        userStorage.push(dataStorage)
    })
    localStorage.setItem('userStorage', JSON.stringify(userStorage))
}

//Hàm lưu todoList xuống localStorage
function saveTodoListStorage() {
    const todoListStorage = []
    todoArr.forEach(listTask => {
        let todoList = {
            task: listTask.task,
            owner: listTask.owner,
            isDone: listTask.isDone
        }
        todoListStorage.push(todoList)
    })
    localStorage.setItem('todoListStorage', JSON.stringify(todoListStorage))
}

//Hàm lấy todoList từ localStorage
function getTodoListStorage() {
    return JSON.parse(localStorage.getItem('todoListStorage'))
}

//Hàm lấy list user từ localStorage
function getUserStorage() {
    return JSON.parse(localStorage.getItem('userStorage'))
}

//Hàm chuyển đổi từ JS Object về Class Instance
function parseUser(userData, index) {
    const user = new User(userData.Firstname, userData.Lastname, userData.Username, userData.Password)
    userArr[index] = user
}