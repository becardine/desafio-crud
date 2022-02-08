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

//fim crud

//Interação

//Salvando curso
const saveCourse = () => {
    if (isValidFields) {
        const course = {
            name: document.getElementById('name').value,
            platform: document.getElementById('platform').value,
            duration: document.getElementById('duration').value,
            start: document.getElementById('start').value,
            concluded: document.getElementById('concluded').value
        }
        const index = document.getElementById('name').dataset.index
        if (index == 'new') {
            createCourse(course)
            updateTable()
        } else {
            updateCourse(index, course)
            updateTable()
        }
    }
}
