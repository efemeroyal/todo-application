export default class TodoModel {
  constructor() {
    this._todos = [
      {
        title: "Cook Food",
        dueDate: "2025-01-01",
        completed: false,
        overdue: true,
      },
      {
        title: "Cook Food",
        dueDate: "2025-01-01",
        completed: true,
      },
      {
        title: "Cook Food",
        dueDate: "2025-01-01",
        completed: false,
      },
    ];
  }

  addTodo(todo) {
    this._todos.push(todo);
  }

  removeTodo(todoIndex) {
    this._todos.splice(todoIndex, 1);
  }

  clearAllTodos() {
    this._todos = [];
  }

  getTodos() {
    return this._todos;
  }

  getTime() {
    const date = new Date(Date.now());

    const options = {
      weekday: "long",
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    return new Intl.DateTimeFormat("en-GB", options).format(date);
  }
}
