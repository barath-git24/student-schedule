let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  updateDashboard();
  renderTasks();
  renderCalendar();
}

// Add Task
function addTask() {
  const title = document.getElementById("taskTitle").value;
  const date = document.getElementById("taskDate").value;

  if (!title || !date) {
    alert("Please fill in all fields");
    return;
  }

  tasks.push({ title, date, completed: false });
  saveTasks();

  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDate").value = "";
}

// Render Task List
function renderTasks() {
  const container = document.getElementById("taskContainer");
  if (!container) return;
  container.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task-item ${task.completed ? "completed" : ""}`;
    li.innerHTML = `
      <span>${task.title} - <small>${task.date}</small></span>
      <div>
        <button onclick="toggleComplete(${index})">✔</button>
        <button onclick="deleteTask(${index})">❌</button>
      </div>
    `;
    container.appendChild(li);
  });
}

// Toggle Complete
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
}

// Delete Task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
}

// Calendar View
function renderCalendar() {
  const cal = document.getElementById("calendarTasks");
  if (!cal) return;
  cal.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = `${task.date} - ${task.title} ${task.completed ? "(Done)" : ""}`;
    cal.appendChild(li);
  });
}

// Dashboard Stats
function updateDashboard() {
  if (!document.getElementById("totalTasks")) return;

  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;

  document.getElementById("totalTasks").textContent = total;
  document.getElementById("completedTasks").textContent = completed;
  document.getElementById("pendingTasks").textContent = pending;
}

// Init
window.onload = () => {
  renderTasks();
  renderCalendar();
  updateDashboard();
};
