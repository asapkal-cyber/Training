const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-todo");
const list = document.getElementById("todo-list");

let todos = JSON.parse(localStorage.getItem("todos") || "[]");

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  list.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.innerText = todo.text;
    if (todo.done) li.classList.add("done");

    li.onclick = () => {
      todos[index].done = !todos[index].done;
      saveTodos();
      renderTodos();
    };

    list.appendChild(li);
  });
}

addBtn.onclick = () => {
  if (!input.value.trim()) return;
  todos.push({ text: input.value, done: false });
  input.value = "";
  saveTodos();
  renderTodos();
};

renderTodos();

const debounceInput = document.getElementById("debounce-input");
const debounceResult = document.getElementById("debounce-result");

function debounce(fn, delay) {
  let timer;
  return value => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(value), delay);
  };
}

const handleSearch = debounce(value => {
  debounceResult.innerText = "Searching for: " + value;
}, 500);

debounceInput.addEventListener("input", e => {
  handleSearch(e.target.value);
});

const form = document.getElementById("form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const message = document.getElementById("form-message");

form.addEventListener("submit", e => {
  e.preventDefault();

  const emailValid = /.+@.+\..+/.test(email.value);
  const passValid = password.value.length >= 6;

  if (!emailValid) {
    message.innerText = "Invalid email address";
    message.style.color = "red";
    return;
  }

  if (!passValid) {
    message.innerText = "Password must be at least 6 characters";
    message.style.color = "red";
    return;
  }

  message.innerText = "Form submitted successfully";
  message.style.color = "green";
  form.reset();
});
