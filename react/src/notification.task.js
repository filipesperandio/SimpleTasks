function NotificationTask (task) {
  var due = task.due ? new Date(task.due) : false;
  var future = (due - Date.now()) >= 0;

  function schedulable () {
    return due && future && !task.done;
  }

  return {
    schedulable : schedulable,
    at : due,
    text : task.title,
    title : "Yo! Remember this:",
    id : Number(Date.now())
  };
}

module.exports = NotificationTask;
