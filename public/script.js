const form = document.getElementById("task-form");
const taskList = document.getElementById("task-list");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const priority = document.getElementById("priority").value;

    const response = await fetch("/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, priority, description })
    });

    if (response.ok) {
        loadTasks();
        form.reset();
    }
});

async function loadTasks() {
    const response = await fetch("/tasks");
    const tasks = await response.json();

    taskList.innerHTML = "";


    tasks.forEach(task => {
        const li = document.createElement("li");
        const liTitle = document.createElement("div");
        liTitle.className = "li-title";

        const liHeader = document.createElement("div");
        liHeader.className = "li-header";

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "X";
        deleteButton.className = "delete-button";

        const taskDescription = document.createElement("p");
        taskDescription.className = "task-description";

        const taskTitle = document.createElement("p");
        taskTitle.className = "task-title";

        const taskPriority = document.createElement("span");
        taskPriority.className = `priority-${task.priority.toLowerCase()}`;

        taskTitle.textContent = task.title;
        taskPriority.textContent = task.priority;
        taskDescription.textContent = task.description || "Sem descrição";

        liTitle.appendChild(taskTitle);
        liTitle.appendChild(taskPriority);
        liHeader.appendChild(liTitle);
        liHeader.appendChild(deleteButton);
        li.appendChild(liHeader);
        li.appendChild(taskDescription);

        // DELETE TASK
        deleteButton.addEventListener("click", async () => {
            await fetch(`/tasks/${task.id}`, { method: "DELETE" });
            loadTasks();
        });
        taskList.appendChild(li);
    });
}

loadTasks();