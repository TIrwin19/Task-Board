// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {

}

// Todo: create a function to create a task card
function createTaskCard(task) {

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});








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