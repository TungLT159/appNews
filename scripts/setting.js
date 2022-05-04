'use strict'
const inputPageSize = document.getElementById('input-page-size')
const inputCategory = document.getElementById('input-category')
const btnSubmit = document.getElementById('btn-submit')
const newsContainer = document.querySelector('#news-container')

// Hàm xử lý thiết lập
function handleSetting() {
    let valuePageSize = inputPageSize.value.trim()
    if (valuePageSize) {
        const settings = {
            pageSize: inputPageSize.value,
            category: inputCategory.value
        }
        alert('Successful setting!')
        inputPageSize.value = ''
        inputCategory.value = 'General'
        localStorage.setItem('settings', JSON.stringify([settings]))
    } else(
        alert('Empty input!')
    )
}

// Bắt sự kiện nút save setting
btnSubmit.addEventListener('click', handleSetting)