document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    function addTask() {
        const text = taskInput.value.trim();
        if (text === '') return;

        const li = document.createElement('li');

        const taskContent = document.createElement('div');
        taskContent.className = 'task-content';
        
        const checkbox = document.createElement('div');
        checkbox.className = 'checkbox';
        
        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.textContent = text;

        taskContent.appendChild(checkbox);
        taskContent.appendChild(taskText);

        taskContent.addEventListener('click', () => {
            li.classList.toggle('completed');
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        
        deleteBtn.addEventListener('click', () => {
            li.remove();
        });

        li.appendChild(taskContent);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);

        taskInput.value = '';
    }

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });
});
