const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const taskCount = document.getElementById("task-count");
const completedCount = document.getElementById("completed-count");
const progressBar = document.getElementById("progress-bar");

let tasks = [];

// FETCH TASKS
async function fetchTasks() {
    try {
        const response = await fetch(
            "http://localhost:5000/api/tasks"
        );

        tasks = await response.json();

        renderTasks();
    } catch (error) {
        console.error(error);
    }
}

fetchTasks();

// ADD TASK
form.addEventListener(
    "submit",
    async function (e) {
        e.preventDefault();

        const taskTitle =
            input.value.trim();

        if (taskTitle === "") {
            alert(
                "Please enter a task."
            );
            return;
        }

        try {
            await fetch(
                "http://localhost:5000/api/tasks",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify({
                        title: taskTitle,
                        description: "",
                        priority: "Medium",
                        category: "General"
                    })
                }
            );

            input.value = "";

            fetchTasks();

        } catch (error) {
            console.error(error);
        }
    }
);

// RENDER TASKS
function renderTasks() {

    taskList.innerHTML = "";

    if (tasks.length === 0) {
        taskList.innerHTML = `
            <p class="empty-state">
                🚀 No tasks yet.
                Add your first task!
            </p>
        `;
    }

    tasks.forEach(task => {

        const li =
            document.createElement("li");

        li.innerHTML = `
            <input
                type="checkbox"
                ${task.completed ? "checked" : ""}
                data-id="${task._id}"
            >

            <span
                class="${
                    task.completed
                        ? "completed"
                        : ""
                }"
            >
                ${task.title}
            </span>

            <button
                class="delete-btn"
                data-id="${task._id}"
            >
                🗑️
            </button>
        `;

        taskList.appendChild(li);
    });

    const completed =
        tasks.filter(
            task => task.completed
        ).length;

    taskCount.textContent =
        tasks.length;

    completedCount.textContent =
        completed;

    const percentage =
        tasks.length === 0
            ? 0
            : (completed /
                tasks.length) *
              100;

    progressBar.style.width =
        percentage + "%";
}

// TOGGLE COMPLETED
taskList.addEventListener(
    "change",
    async function (e) {

        if (
            e.target.type ===
            "checkbox"
        ) {

            const id =
                e.target.dataset.id;

            const task =
                tasks.find(
                    task =>
                        task._id === id
                );

            try {
                await fetch(
                    `http://localhost:5000/api/tasks/${id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type":
                                "application/json"
                        },
                        body: JSON.stringify({
                            completed:
                                e.target.checked
                        })
                    }
                );

                fetchTasks();

            } catch (error) {
                console.error(error);
            }
        }
    }
);

// DELETE TASK
taskList.addEventListener(
    "click",
    async function (e) {

        if (
            e.target.classList.contains(
                "delete-btn"
            )
        ) {

            const id =
                e.target.dataset.id;

            try {
                await fetch(
                    `http://localhost:5000/api/tasks/${id}`,
                    {
                        method: "DELETE"
                    }
                );

                fetchTasks();

            } catch (error) {
                console.error(error);
            }
        }
    }
);