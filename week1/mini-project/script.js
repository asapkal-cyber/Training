const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");
const filters = document.querySelectorAll(".filter");
const clearBtn = document.getElementById("clear-completed");
const taskCount = document.getElementById("task-count");

let filter = "all";
let todos = JSON.parse(localStorage.getItem("todos") || "[]");

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  list.innerHTML = "";

  const filteredTodos = todos.filter(todo => {
    if (filter === "pending") return !todo.done;
    if (filter === "done") return todo.done;
    return true;
  });

  filteredTodos.forEach((todo, index) => {
    const li = document.createElement("li");
    if (todo.done) li.classList.add("done");

    li.innerHTML = `
      <label class="task">
        <input type="checkbox" ${todo.done ? "checked" : ""}>
        <span>${todo.text}</span>
      </label>
      <button data-index="${index}">X</button>
    `;

    const checkbox = li.querySelector("input");

    checkbox.onchange = () => {
      todo.done = checkbox.checked;
      saveTodos();
      renderTodos();
    };

    li.querySelector("button").onclick = () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    };

    list.appendChild(li);
  });

  const pendingCount = todos.filter(t => !t.done).length;
  taskCount.innerText = `${pendingCount} tasks pending`;
}

addBtn.onclick = () => {
  if (!input.value.trim()) return;
  todos.push({ text: input.value.trim(), done: false });
  input.value = "";
  saveTodos();
  renderTodos();
};

filters.forEach(btn => {
  btn.onclick = () => {
    filters.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    filter = btn.dataset.filter;
    renderTodos();
  };
});

clearBtn.onclick = () => {
  todos = todos.filter(todo => !todo.done);
  saveTodos();
  renderTodos();
};

renderTodos();
