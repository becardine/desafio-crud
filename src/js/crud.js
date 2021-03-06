const clearModal = () => clearFields()

//Cria banco de dados no localStorage
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_course')) ?? []
const setLocalStorage = (dbCourse) => localStorage.setItem("db_course", JSON.stringify(dbCourse))

//crud

//create
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

//Verifica se todos os campos que são obrigatorios estão preenchidos
const isValidFields = () => {
    return document.getElementsById('form').reportValidity()
}

//Limpar campos do formulario quando não salvar nada
const clearFields = () => {
    const fields = document.querySelectorAll('.form-control')
    fields.forEach(field => field.value = "")
}

//Interação

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

//Preenchendo dados na tabela

const createRow = (course, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
              <td>${course.name}</td>
              <td>${course.platform}</td>
              <td>${course.duration}</td>
              <td>${course.start}</td>
              <td>${course.concluded}</td>
              <td><button type="button" data-bs-toggle="modal" data-bs-target="#addModal" class="btn btn-edit" data-action="edit-${index}"><img class="img-edit" src="src\\img\\icons\\pencil.png" alt="Icon pencil"></button></td>
              <td><button type="button" class="btn btn-delete" data-action="delete-${index}"><img class="img-delete" src="src\\img\\icons\\trash.png" alt="Icon trash"></button></td>
    `  
    document.querySelector('#tableCourse>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableCourse>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbCourse = readCourse()
    clearTable()
    dbCourse.forEach(createRow)
}

//Editar dados
const fillFields = (course) => {
    document.getElementById('name').value = course.name
    document.getElementById('platform').value = course.platform
    document.getElementById('duration').value = course.duration
    document.getElementById('start').value = course.start
    document.getElementById('concluded').value = course.concluded
    document.getElementById('name').dataset.index = course.index
}

const editCourse = (index) => {
    const course = readCourse()[index]
    course.index = index
    fillFields(course)
    
}

const editDelete = (event) => {
    if (event.target.type == 'button'){
        const [action, index] = event.target.dataset.action.split('-')

        if (action == 'edit') {
            editCourse(index)
            updateTable()
        } else {
            const course = readCourse()[index]
            const response = confirm(`Tem certeza que deseja excluir o curso ${course.name}?`)
            if (response) {
                deleteCourse(index)
                updateTable()
            }
        }
    }
}

updateTable()

//Eventos
document.getElementById('btn-save')
    .addEventListener('click', saveCourse)

document.getElementById('clearModal')
    .addEventListener('click', clearModal)

document.querySelector('#tableCourse>tbody')
    .addEventListener('click', editDelete)

