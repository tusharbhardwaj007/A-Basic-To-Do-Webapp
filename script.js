document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    let taskInput = document.getElementById('taskInput');
    let taskText = taskInput.value;
    if (taskText === '') return;

    let task = {
        text: taskText,
        id: Date.now(),
        completed: false,
        timestamp: new Date().toLocaleString()
    };

    addTaskToDOM(task);
    saveTask(task);
    taskInput.value = '';
}

function addTaskToDOM(task) {
    let taskList = document.getElementById('taskList');

    let li = document.createElement('li');
    li.setAttribute('data-id', task.id);

    let taskContent = document.createElement('span');
    taskContent.innerText = task.text;

    let dateTime = document.createElement('span');
    dateTime.className = 'date-time';
    dateTime.innerText = task.timestamp;

    let completeButton = document.createElement('button');
    completeButton.innerText = 'Complete';
    completeButton.onclick = function() {
        markAsComplete(li, task.id);
    };

    let editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.onclick = function() {
        editTask(li, task.id);
    };

    let deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.onclick = function() {
        deleteTask(li, task.id);
    };

    li.appendChild(taskContent);
    li.appendChild(dateTime);
    if (!task.completed) li.appendChild(completeButton);
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    if (task.completed) {
        li.classList.add('completed');
    }

    taskList.appendChild(li);
}

function markAsComplete(taskElement, taskId) {
    let task = loadTask(taskId);
    task.completed = true;
    task.timestamp = new Date().toLocaleString();

    saveTask(task);
    taskElement.remove();
    addTaskToDOM(task);
}

function editTask(taskElement, taskId) {
    let task = loadTask(taskId);
    let taskText = prompt('Edit your task', task.text);
    if (taskText !== null && taskText !== '') {
        task.text = taskText;
        task.timestamp = new Date().toLocaleString();

        saveTask(task);
        taskElement.remove();
        addTaskToDOM(task);
    }
}

function deleteTask(taskElement, taskId) {
    taskElement.style.animation = 'slideOut 0.5s ease-out forwards';
    setTimeout(() => {
        taskElement.remove();
        removeTask(taskId);
    }, 500);
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let existingTaskIndex = tasks.findIndex(t => t.id === task.id);
    if (existingTaskIndex !== -1) {
        tasks[existingTaskIndex] = task;
    } else {
        tasks.push(task);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(addTaskToDOM);
}

function loadTask(taskId) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return tasks.find(task => task.id === taskId);
}

function removeTask(taskId) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function filterTasks(status) {
}