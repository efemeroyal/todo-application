import TodoModel from "./model.js";
import TodoView from "./views/todoView.js";
import FiltersView from "./views/filtersView.js";

class Todo {
  constructor() {
    this.model = new TodoModel();
    this.view = new TodoView();
    this.filters = new FiltersView();
    this.init();
  }

  init() {
    this.handleRenderTime();
    this.view.onAddTodo(this.handleAddTodo.bind(this));
    this.view.onDeleteTodo(this.handleDeleteTodo.bind(this));
    this.view.onEditTodo(this.handleEditTodo.bind(this));
    this.handleRenderTodos(this.model.getTodos());
    this.view.onTodoCompleted();
    this.filters.onClikcedDashboard(
      this.handleRenderTodos.bind(this, this.model.getTodos())
    );
    this.filters.onClikcedCompleted(
      this.handleRenderTodos.bind(this, this.model.getCompletedTodos())
    );
    this.filters.onClikcedOverDue(
      this.handleRenderTodos.bind(this, this.model.getOverdueTodos())
    );
    this.filters.onClikcedToday(
      this.handleRenderTodos.bind(
        this,
        this.model.getTodayTodos(this.model.getTodos())
      )
    );
  }

  handleRenderTime() {
    setInterval(() => {
      const time = this.model.getTime();
      this.view.renderTime(time);
    }, 1000);
  }

  handleRenderTodos(todos = this.model.getTodos()) {
    this.view.renderTodos(todos);
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
