'use strict';
const btnPrev = document.getElementById('btn-prev')
const btnNext = document.getElementById('btn-next')
const pageNum = document.getElementById('page-num')
const inputQuery = document.getElementById('input-query')
const btnSubmit = document.getElementById('btn-submit')
const newsContainer = document.getElementById('news-container')

const currentUser = JSON.parse(localStorage.getItem('currentUser')) //Lấy ra người dùng hiện tại từ localStorage
const settings = JSON.parse(localStorage.getItem('settings')) // Lấy ra settings từ localStorage

// Chuyển đổi currentUser về dạng Class Instance
currentUser.forEach((userData, index) => {
    const user = new User(userData.Firstname, userData.Lastname, userData.Username, userData.Password)
    currentUser[index] = user
})

let category = settings[0].category //Lấy category từ settings
let pageSize = settings[0].pageSize //Lấy pageSize từ settings
let page = 1
let keyword = ''

//Check số page để ẩn nút prev và next
if (page == 1) {
    btnPrev.style.display = "none"
}


async function limitPage() {
    try {
        const resTotal = await currentUser[0].getNews(category, pageSize, page, keyword)
        const totalResults = resTotal.totalResults
        console.log(totalResults)
        const limitPages = Math.trunc(totalResults / pageSize)
        if (page == limitPages) {
            btnNext.style.display = "none"
        }
    } catch (err) {
        console.error(err)
    }
}
limitPage()
    //Hàm render tin tức
async function renderNews() {
    try {
        const res = await currentUser[0].getNews(category, pageSize, page, keyword)
        const dataRender = res.articles
        console.log(dataRender)
        newsContainer.innerHTML = ''
        dataRender.forEach(data => {
            const htmls = `
        <div class="card mb-3" style="max-width: 100%;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${data.urlToImage}" class="img-fluid rounded-start" alt="" style="max-width: 100%; height: 100%;" >
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${data.title}</h5>
                        <p class="card-text">${data.description}</p>
                        <a class="btn btn-primary" href="${data.url}">View</a>
                    </div>
                </div>
            </div>
        </div>
        `
            pageNum.textContent = page
            newsContainer.insertAdjacentHTML('beforeend', htmls)
        })
    } catch (err) {
        console.error(err)
        const errors = `
        <p>Some thing went wrong💥💥</p>
        `
        newsContainer.insertAdjacentHTML('beforeend', errors)
    }

}

//Xử lý submit
function handleSubmit() {
    let val = inputQuery.value.trim()
    if (val) {
        keyword = inputQuery.value
        renderNews()
    } else {
        alert('Empty input!')
    }
}

//Xử lú nút prev
function handlePrev() {
    page--
    btnNext.style.display = "block"
    if (page == 1) {
        btnPrev.style.display = "none"
    }
    renderNews()
    return page
}

//Xử lý nút next
function handleNext() {
    page++
    btnPrev.style.display = "block"
    limitPage()
    renderNews()
    return page
}


//Bắt sự kiện các nút
btnSubmit.addEventListener('click', handleSubmit)
btnPrev.addEventListener('click', handlePrev)
btnNext.addEventListener('click', handleNext)