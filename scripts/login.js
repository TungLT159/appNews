'use strict'

const inputUserName = document.getElementById('input-username')
const inputPassword = document.getElementById('input-password')
const btnSubmit = document.getElementById('btn-submit')

// Lấy ra list user từ localStorage
const userArr = getUserStorage() ? getUserStorage() : []
userArr.forEach(parseUser) // Chuyển đổi list user về dạng Class Instance
console.log(userArr)

function clearInput() {
    inputUserName.value = ''
    inputPassword.value = ''
}

btnSubmit.addEventListener('click', () => {
    // validate dữ liệu form đăng nhập
    if (inputUserName.value === '' && inputPassword.value === '') {
        alert('Empty username or password!')
        return false
    }

    //Tìm user có username password trùng với dữ liệu input
    const checkLogin = userArr.find(userData => {
        if (inputUserName.value === userData.Username && inputPassword.value === userData.Password) {
            localStorage.setItem('currentUser', JSON.stringify([userData])) //Nếu đúng thì lưu người dùng hiện tại xuống localStorage
            return true
        } else if (inputUserName.value !== userData.Username && inputPassword.value !== userData.Password) {
            return false
        }
    })
    console.log(checkLogin)
        // Kiểm tra biến checkLogin
    if (Boolean(checkLogin) == true) {
        window.location.href = "../index.html"
        alert('Đăng nhập thành công!')
    } else if (Boolean(checkLogin) == false) {
        clearInput()
        alert('Sai tài khoản hoặc mật khẩu!')
    }

})