'use strict'

const inputFirstName = document.getElementById('input-firstname')
const inputLastName = document.getElementById('input-lastname')
const inputUserName = document.getElementById('input-username')
const inputPassword = document.getElementById('input-password')
const inputPasswordConfirm = document.getElementById('input-password-confirm')
const btnSubmit = document.getElementById('btn-submit')



const userArr = getUserStorage() ? getUserStorage() : [] // Lấy ra list user từ localStorage
userArr.forEach(parseUser) // Chuyển đổi list user về dạng Class Instance
console.log(userArr);


// Check Username bi trung
const chekcUnique = function(arr, index) {
    let check = arr.filter(user => user.Username === index)

    if (check.length) {
        return true // Username trung
    } else {
        return false //Username ko trung
    }
}

// Clear ô input
function clearText() {
    inputFirstName.value = ''
    inputLastName.value = ''
    inputUserName.value = ''
    inputPassword.value = ''
    inputPasswordConfirm.value = ''
}

// Xử lý submit
function handleSubmit() {
    //Tạo Instance từ class User
    const userData = new User(
        inputFirstName.value,
        inputLastName.value,
        inputUserName.value,
        inputPassword.value
    )

    if (userData.Firstname == '' || userData.Lastname == '' || userData.Username == '' || userData.Password == '') {
        alert('Xin nhập dữ liệu!')
        return false
    }
    if (userData.Password.length <= 8) {
        alert('Mật khẩu phải lớn hơn 8 ký tự!')
        return false
    }
    if (userData.Password !== inputPasswordConfirm.value) {
        alert('Xác nhận mật khẩu chưa đúng!')
        return false
    }
    let isunique = chekcUnique(userArr, userData.Username)
    if (isunique) {
        alert('Username đã được sử dụng!')
        return false
    }
    console.log(userData)
    userArr.push(userData)
    saveUserStorage()
    clearText()
    alert('Tạo tài khoản thành công!')
    window.location.href = "../pages/login.html"
}

//Bắt sự kiện nút submit
btnSubmit.addEventListener('click', handleSubmit)