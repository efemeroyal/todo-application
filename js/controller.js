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
    this.view.onTodoCompleted();
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

  handleEditTodo(index, input, date) {
    const todo = this.model.getTodos()[index];
    input.value = todo.title;
    date.value = todo.dueDate;

    this.handleDeleteTodo(index);

    if (input.value !== null && date.value !== null) {
      todo.title = input.value;
      todo.dueDate = date.value;
      this.view.renderTodos(this.model.getTodos());
    }
  }

  handleTodoCompleted(todo) {
    todo.completed = !todo.completed;
  }
}

new Todo();
