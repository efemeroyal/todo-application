import TodoModel from "./model.js";
import TodoView from "./views/todoView.js";

class Todo {
  constructor() {
    this.model = new TodoModel();
    this.view = new TodoView();
    this.init();
  }

  init() {
    this.handleRenderTime();
    this.view.onAddTodo(this.handleAddTodo.bind(this));
    this.view.onDeleteTodo(this.handleDeleteTodo.bind(this));
    this.view.onEditTodo(this.handleEditTodo.bind(this));
    this.handleRenderTodos();
  }

  handleRenderTime() {
    setInterval(() => {
      const time = this.model.getTime();
      this.view.renderTime(time);
    }, 1000);
  }

  handleRenderTodos() {
    this.view.renderTodos(this.model.getTodos());
    this.view.clearInputs();
  }

  handleAddTodo() {
    // this.model.clearAllTodos();

    const todo = {
      completed: false,
      title: this.view.getTodoInput(),
      dueDate: this.view.getTodoDueDate(),
    };

    this.model.addTodo(todo);
    this.handleRenderTodos();
  }

  handleDeleteTodo(index) {
    this.model.removeTodo(index);
    this.view.renderTodos(this.model.getTodos());
  }

  handleEditTodo(index) {
    const todo = this.model.getTodos()[index];
    const newTitle = prompt("Edit title:", todo.title);
    const newDate = prompt("Edit due date:", todo.dueDate);

    if (newTitle !== null && newDate !== null) {
      todo.title = newTitle;
      todo.dueDate = newDate;
      this.view.renderTodos(this.model.getTodos());
    }
  }
}

new Todo();
