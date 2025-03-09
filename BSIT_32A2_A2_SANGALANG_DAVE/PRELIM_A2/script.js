document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTaskButton");
    const taskList = document.getElementById("taskList");

    addTaskButton.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    });

    function addTask() {
        const task = taskInput.value.trim();
        if (task === "") {
            alert("Task cannot be empty!");
            return;
        }

        const listItem = document.createElement("li");
        listItem.className = "list-group-item d-flex justify-content-between align-items-center";
        listItem.innerHTML = `
            <span class="task-text">${task}</span>
            <div>
                <button class="btn btn-sm btn-warning edit-button">Edit</button>
                <button class="btn btn-sm btn-success done-button">Done</button>
                <button class="btn btn-sm btn-danger delete-button">Delete</button>
            </div>
        `;

        taskList.appendChild(listItem);
        taskInput.value = "";

        saveTasks();
    }

    taskList.addEventListener("click", (e) => {
        const listItem = e.target.parentElement.parentElement;

        if (e.target.classList.contains("delete-button")) {
            listItem.remove();
            saveTasks();
        }

        if (e.target.classList.contains("done-button")) {
            listItem.classList.toggle("list-group-item-success");
            saveTasks();
        }

        if (e.target.classList.contains("edit-button")) {
            const taskText = listItem.querySelector(".task-text");
            const newTask = prompt("Edit your task:", taskText.innerText);
            if (newTask && newTask.trim() !== "") {
                taskText.innerText = newTask.trim();
                saveTasks();
            }
        }
    });

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll(".list-group-item").forEach(item => {
            tasks.push({
                text: item.querySelector(".task-text").innerText,
                done: item.classList.contains("list-group-item-success")
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        savedTasks.forEach(task => {
            const listItem = document.createElement("li");
            listItem.className = `list-group-item d-flex justify-content-between align-items-center ${task.done ? 'list-group-item-success' : ''}`;
            listItem.innerHTML = `
                <span class="task-text">${task.text}</span>
                <div>
                    <button class="btn btn-sm btn-warning edit-button">Edit</button>
                    <button class="btn btn-sm btn-success done-button">Done</button>
                    <button class="btn btn-sm btn-danger delete-button">Delete</button>
                </div>
            `;
            taskList.appendChild(listItem);
        });
    }

    loadTasks();
});
