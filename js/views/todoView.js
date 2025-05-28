export default class TodoView {
  constructor() {
    this._timeEl = document.querySelector("#time");
    this._todoInput = document.querySelector("#todo__title");
    this._todoDueDate = document.querySelector("#todo__date");
    this._parentEl = document.querySelector(".todos");
    this._addTodoBtn = document.querySelector(".add-todo");
  }

  renderTime(time) {
    this._timeEl.textContent = time;
  }

  renderTodos(todos) {
    this._parentEl.innerHTML = "";
    if (todos.length === 0) {
      const _markup = `<h2>No Tasks in your TODOS :(</h2>`;
      this._parentEl.insertAdjacentHTML("beforeend", _markup);
      return;
    }

    this._parentEl.insertAdjacentHTML("beforeend", this.#generateMarkup(todos));
  }

  #generateMarkup(todos) {
    return todos
      .map(
        (todo, index) => `
        <div class="todo" data-index="${index}">
          <div>
            <input type="checkbox" id="checkbox-${index}" />
            <label for="checkbox-${index}" class="todo__title">${todo.title}</label>
          </div>
          <p class="todo__due-date">${todo.dueDate}</p>
          <div class="todo__actions">
            <button class="edit-todo">Edit</button>
            <button class="delete-todo">Delete</button>
          </div>
        </div>
      `
      )
      .toString();
  }

  getTodoInput() {
    return this._todoInput.value;
  }
  getTodoDueDate() {
    return this._todoDueDate.value;
  }

  clearInputs() {
    this._todoDueDate.value = "";
    this._todoInput.value = "";
  }

  onAddTodo(handler) {
    this._addTodoBtn.addEventListener("click", (e) => {
      if (this._todoInput.value === "" || this._todoDueDate.value === "")
        return;

      e.preventDefault();
      handler();
    });
  }

  onDeleteTodo(handler) {
    this._parentEl.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-todo")) {
        const index = e.target.closest(".todo").dataset.index;
        handler(Number(index));
      }
    });
  }

  onEditTodo(handler) {
    this._parentEl.addEventListener("click", (e) => {
      if (e.target.classList.contains("edit-todo")) {
        const index = e.target.closest(".todo").dataset.index;
        handler(Number(index));
      }
    });
  }
}
