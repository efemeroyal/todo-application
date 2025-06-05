export default class FiltersView {
  constructor() {
    this._completedEl = document.querySelector("li.completed");
    this._dashboardEl = document.querySelector("li.dashboard");
    this._overdueEl = document.querySelector("li.overdue");
    this._todayEl = document.querySelector("li.today");
  }

  onClikcedCompleted(handler) {
    this._completedEl.addEventListener("click", function (e) {
      handler();
    });
  }

  onClikcedDashboard(handler) {
    this._dashboardEl.addEventListener("click", function (e) {
      handler();
    });
  }
  onClikcedOverDue(handler) {
    this._overdueEl.addEventListener("click", function (e) {
      handler();
    });
  }
  onClikcedToday(handler) {
    this._todayEl.addEventListener("click", function (e) {
      handler();
    });
  }
}
