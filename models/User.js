'use strict'
// Tạo Class User
class User {
    constructor(Firstname, Lastname, Username, Password) {
            this.Firstname = Firstname
            this.Lastname = Lastname
            this.Username = Username
            this.Password = Password
        }
        //Phương thức lấy dữ liệu tin tức từ API
    async getNews(category, pageSize, page, keyword) {
        try {
            const data = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=${pageSize}&page=${page}&q=${keyword}&apiKey=34780bac98d148498ec45e45eb2ff8c2`)
            const res = await data.json()
            return res
        } catch (err) {
            console.error(err)
        }
    }

}

// Tạo Class Task
class Task {
    constructor(task, owner, isDone) {
        this.task = task
        this.owner = owner
        this.isDone = isDone
    }
}