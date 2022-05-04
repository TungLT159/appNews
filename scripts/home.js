'use strict'
const loginModal = document.getElementById('login-modal')
const btnLogout = document.getElementById('btn-logout')
const welcomeMgs = document.getElementById('welcome-message')


const currentUser = JSON.parse(localStorage.getItem('currentUser')) //Lấy ra người dùng hiện tại từ localStorage

// Chuyển đổi currentUser về dạng Class Instance
currentUser.forEach((userData, index) => {
    const user = new User(userData.Firstname, userData.Lastname, userData.Username, userData.Password)
    currentUser[index] = user
})
console.log(currentUser)
    //Check nếu có người dùng hiện tại thì ẩn model login hiển thị nút logout và ngược lại
if (currentUser.length > 0) {
    // btnLogout.style.display = 'none'
    btnLogout.style.display = 'block'
    welcomeMgs.style.display = 'block'
    welcomeMgs.textContent = `Welcome ${currentUser[0].Username}`
    loginModal.style.display = 'none'
} else {
    loginModal.style.display = 'block'
}

//Xử lý logout
function handleLogout() {
    localStorage.setItem('currentUser', JSON.stringify([]))
    window.location.href = "../index.html"
}

//Bắt sự kiện nút logout
btnLogout.addEventListener('click', handleLogout)