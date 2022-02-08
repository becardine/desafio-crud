const getLocalStorage = () => JSON.parse(localStorage.getItem('db_course')) ?? []
const setLocalStorage = (dbCourse) => localStorage.setItem("db_course", JSON.stringify(dbCourse))


//CRUD 

//creat
const createCourse = (course) => {
    const dbCourse = getLocalStorage()
    dbCourse.push(course)
    setLocalStorage(dbCourse)
}

//read
const readCourse = () => getLocalStorage()

//update
const updateCourse = (index, course) => {
    const dbCourse = readCourse()
    dbCourse[index] = course
    setLocalStorage(dbCourse)
}

//delete
const deleteCourse = (index) => {
    const dbCourse = readCourse()
    dbCourse.splice(index, 1)
    setLocalStorage(dbCourse)
}