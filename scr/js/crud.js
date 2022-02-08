const getLocalStorage = () => JSON.parse(localStorage.getItem('db_course')) ?? []
const setLocalStorage = (dbCourse) => localStorage.setItem("db_course", JSON.stringify(dbCourse))


//CRUD 

//creat
const createCourse = (course) => {
    const dbCourse = getLocalStorage()
    dbCourse.push(course)
    setLocalStorage(dbCourse)
}