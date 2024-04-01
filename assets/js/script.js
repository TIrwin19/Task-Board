// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"))
let nextId = JSON.parse(localStorage.getItem("nextId")) || 0

// Todo: create a function to generate a unique task id
function generateTaskId() {
    nextId++
    return nextId
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const newTaskCard = (`
    <div data-task='${task.id}' data-status='${task.status}' class="new-task my-4 p-3 rounded-5 border border-dark-subtle shadow-lg p-3 mb-5 bg-body-tertiary rounded">
        <h2 class="task-title">${task.taskTitle}</h2>
        <p class="task-date">${task.description}</p>
        <p id="date-color" class="task-desc">Due: ${task.dueDate}</p>
        <button id="delete-task-btn" class="rounded btn btn btn-outline-light bg-danger bg-gradient">Delete</button>
    </div>
    `)

    return newTaskCard
}


// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    
    let taskList = JSON.parse(localStorage.getItem("formArray")) || []
    
    taskList.forEach(task => {
        const newTaskCard = createTaskCard(task)
        const todoLane = $('#todo-cards')
        // const targetLane = $('.lanes[data-status="' + task.status + '"]')
        todoLane.append(newTaskCard)
        // targetLane.append(newTaskCard)
        const newTask = $('.new-task')
        if(dayjs().isAfter(task.dueDate, 'day')) {
            newTask.addClass('bg-danger')
        } else if (dayjs().isSame(task.dueDate, 'day')) {
            newTask.addClass('bg-warning text-dark')
        } else {
            newTask.addClass('bg-light text-dark')
        }
    
    })


    const taskDrag = $('.new-task')
    taskDrag.draggable({
        revert: 'invalid',
        containment: 'document',
        opacity: 0.5,
        zIndex: 100
    })
    
    const deleteTask = $('#delete-task-btn')
    deleteTask.on('click', handleDeleteTask)
}
// Todo: create a function to handle adding a new task
function handleAddTask(e) {
    e.preventDefault()
    const taskNameValue = $('#nameInput').val()
    const dueDateValue = $('#dateInput').val()
    const descriptionValue = $('#descriptionInput').val()
        
    const raw = localStorage.getItem('formArray')
    const taskArray = JSON.parse(raw) || []

    const uniqueId = generateTaskId()
    
    const newTaskObj = {
        id: uniqueId,
        taskTitle: taskNameValue,
        dueDate: dayjs(dueDateValue).format('MMM D, YYYY'),
        description: descriptionValue
    }
    
    taskArray.push(newTaskObj)
    
    localStorage.setItem('formArray', JSON.stringify(taskArray))
    localStorage.setItem('nextId', JSON.stringify(uniqueId))
    window.location.reload()
    // $('#formModal').modal('hide')
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    let taskId = $(event.target).closest('.new-task').data('task')
    let taskArray = JSON.parse(localStorage.getItem("formArray")) || []
    taskArray = taskArray.filter(task => task.id !== taskId)
    localStorage.setItem('formArray', JSON.stringify(taskArray))
    $(event.target).closest('.new-task').remove()
    window.location.reload()
}


// Todo: create a function to handle dropping a task into a new status lane
function handleDrop() {
    $('.lanes').droppable({
        accept: '.new-task',

    })

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList()
    handleDrop()

    const submitBtn =  $('#submit')
    submitBtn.on('click', function(e) {
        handleAddTask(e)
        generateTaskId()
        // createTaskCard()
    })
});
 
// ===========================================================
// Light and dark mode

// Gets the body element and assigns it to a variable
const body = document.body

// Grabs the id tag assigned to the light/dark button
const darkToggle = document.getElementById('toggle')

const theme = localStorage.getItem('theme')
if(theme){
    document.body.classList.add('dark-mode')
}

// Adds an event listener to the button and when the button is pressed a class tag is applied to the body element which enables the css styles assigned to the .dark-mode class tag
darkToggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode')
    
    if(document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark-mode')
        
    } else{
        localStorage.removeItem('theme')
    }
})