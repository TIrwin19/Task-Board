// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"))
let nextId = JSON.parse(localStorage.getItem("nextId")) || 0
const todoLane = $('todo-cards')
const inProgressLane = $('in-progress-cards')
const doneLane = $('done-cards')
const taskForm = $('#taskForm')

function taskObjectArray(){
    const raw = localStorage.getItem('formArray')
    const taskArray = JSON.parse(raw) || []

    return taskArray
}

// Todo: create a function to generate a unique task id
function generateTaskId() {
    nextId++
    return nextId
}

// Todo: create a function to create a task card
function createTaskCard(task, index) {
    const newTaskCard = (`
    <div data-task='${task.id}' data-index='${index}' data-status='${task.status}' class="new-task my-4 p-3 rounded-5 border border-dark-subtle shadow-lg p-3 mb-5 bg-body-tertiary rounded">
        <h2 class="task-title">${task.taskTitle}</h2>
        <p class="task-date">${task.description}</p>
        <p id="date-color" class="task-desc">Due: ${task.dueDate}</p>
        <button class="delete-task-btn rounded btn btn-outline-light bg-danger bg-gradient">Delete</button>
    </div>
    `)
    return newTaskCard
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    
    const taskList = taskObjectArray()
    
    taskList.forEach(function(task, index){
        const newTaskCard = createTaskCard(task, index)
        const todoLane = $('#todo-cards')
        todoLane.append(newTaskCard)

        // if (task.status === 'to-do') {
        //     todoLane.append(newTaskCard)
        // } else if (task.status === 'in-progress') {
        //     inProgressLane.append(newTaskCard)
        // } else {
        //     doneLane.append(newTaskCard)
        // }

        const newTask = $('.new-task')
        if(dayjs().isAfter(task.dueDate, 'day')) {
            newTask.addClass('bg-danger')
        } else if (dayjs().isSame(task.dueDate, 'day')) {
            newTask.addClass('bg-warning text-dark')
        } else {
            newTask.addClass('bg-light text-dark')
        }
    })

    const deleteTask = $('.delete-task-btn')
    deleteTask.on('click', handleDeleteTask)
}

function setupDrag(els) {
    els.draggable({
        revert: true,
        containment: 'document',
        opacity: 0.5,
        zIndex: 100
    })
}

// Todo: create a function to handle adding a new task
function handleAddTask(e) {
    e.preventDefault()
    const taskNameValue = $('#nameInput').val()
    const dueDateValue = $('#dateInput').val()
    const descriptionValue = $('#descriptionInput').val()
        
    const taskArray = taskObjectArray()

    const uniqueId = generateTaskId()
    
    const newTaskObj = {
        id: uniqueId,
        taskTitle: taskNameValue,
        // dueDate: dayjs(dueDateValue).format('MMM D, YYYY'),
        dueDate: dueDateValue,
        description: descriptionValue
    }
    console.log(dueDateValue)
    
    taskArray.push(newTaskObj)
    
    localStorage.setItem('formArray', JSON.stringify(taskArray))
    localStorage.setItem('nextId', JSON.stringify(uniqueId))

    const todoLane = $('#todo-cards')
    const taskEl = createTaskCard(newTaskObj)
    todoLane.append(taskEl)

    window.location.reload()
    // $('#formModal').modal('hide')
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    let taskId = $(event.target).closest('.new-task').data('task')
    let taskArray = taskObjectArray()
    taskArray = taskArray.filter(task => task.id !== taskId)
    localStorage.setItem('formArray', JSON.stringify(taskArray))
    $(event.target).closest('.new-task').remove()
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop() {
    $('#todo-cards, #in-progress-cards, #done-cards').droppable({
        accept: '.new-task',
        drop: function(eventObj, ui) {
            const lane = $(eventObj.target)
            const newCard = $(ui.draggable[0])
            const index = $('.new-task').data('task')

            newTaskCard.css({
                position: 'relative',
                top: 0,
                left: 0
            })
            lane.append(newCard)

            const taskArray = taskObjectArray()

            const taskObj = taskArray[index]

            if (lane.hasClass('todo-cards')) {
                taskObj.status = 'to-do'
            } else if (lane.hasClass('in-progress-cards')) {
                taskObj.status = 'in-progress'
            } else {
                taskObj.status = 'done'
            }

            localStorage.setItem('formArray', JSON.stringify(taskArray))

        }
    })
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    handleDrop()
    renderTaskList()
    setupDrag($('.new-task'))
    const submitBtn =  $('#submit')
    // taskForm.on('submit', handleAddTask)
    submitBtn.on('click', function(e) {
        handleAddTask(e)
    })
});
 
// Dark Mode
// ===========================================================
const body = document.body

const darkToggle = document.getElementById('toggle')

const theme = localStorage.getItem('theme')
if(theme){
    document.body.classList.add('dark-mode')
}

darkToggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode')
    
    if(document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark-mode')
        
    } else{
        localStorage.removeItem('theme')
    }
})