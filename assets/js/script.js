// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
// use math rendom to generate a task id
function generateTaskId() {
    const randomId = Math.floor(Math.random() * 1000) + 100;
    // console.log(randomId);
    return randomId
}





// Todo: create a function to create a task card
const todoOutput = $('#todo-cards')
const tasks = JSON.parse(localStorage.getItem('formArray')) || []

function createTaskCard(task) {

    if (tasks.length) {
        todoOutput.innerHTML = ''
    }

    for( let task of tasks) {
        todoOutput.append(`
        <div id="${generateTaskId()}" class="new-task my-4 p-3 rounded-3 border border-dark-subtle">
            <h2 class="task-title">${task.taskTitle}</h2>
            <p class="task-date">${task.description}</p>
            <p class="task-desc">Due: ${task.dueDate}</p>
            <button id="delete-task-btn" class="rounded btn btn-outline-danger">Delete</button>
        </div>
        `)
    }
}

createTaskCard()


// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
const formData = $('#taskForm')
const taskName = $('#nameInput')
const dueDate = $('#dateInput')
const description = $('#descriptionInput')

function handleAddTask(e) {
    e.preventDefault()
    const taskNameValue = taskName.val()
    const dueDateValue = dueDate.val()
    const descriptionValue = description.val()
    
    const raw = localStorage.getItem('formArray')
    const taskArray = JSON.parse(raw) || []
    
    const newTaskObj = {
        taskTitle: taskNameValue,
        dueDate: dueDateValue,
        description: descriptionValue
    }
    
    console.log(newTaskObj)

    taskArray.push(newTaskObj)
    
    localStorage.setItem('formArray', JSON.stringify(taskArray))
    
    // formData.trigger('reset')
    // $('#formModal').css.style('display: none;')

}


// Todo: create a function to handle deleting a task

function handleDeleteTask(event) {
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
const submitBtn =  $('#submit')
$(document).ready(function () {
});

submitBtn.on('click', function(event) {
    handleAddTask(event)
    generateTaskId()
    createTaskCard()
    window.location.reload()
})
// const submitBtn =  $('#submit')
// function startSubmit() {
//     submitBtn.on('click', handleAddTask)
//     submitBtn.on('click', generateTaskId)
//     submitBtn.on('click', createTaskCard)
//     submitBtn.on($('#formModal').hide())
// }

// startSubmit()

 





// ===========================================================
// Light and dark mode

// Gets the body element and assigns it to a variable
// const body = document.body

// Grabs the id tag assigned to the light/dark button
// const darkToggle = document.getElementById('toggle')

// const theme = localStorage.getItem('theme')
// // if(theme){
//     document.body.classList.add('dark-mode')
// }

// Adds an event listener to the button and when the button is pressed a class tag is applied to the body element which enables the css styles assigned to the .dark-mode class tag
// darkToggle.addEventListener('click', function() {
    // body.classList.toggle('dark-mode')
    
    // if(document.body.classList.contains('dark-mode')) {
        // localStorage.setItem('theme', 'dark-mode')
        
    // } else{
        // localStorage.removeItem('theme')
    // }
// })