function TaskListFactory (firebase, firebaseArray, userFactory) {

  function TaskList (name, loadedCallback) {
    var user = userFactory();
    var rootPath = '/usertasks/' + user.uid + '/tasklists/' + name;
    var taskListRef = firebase.child(rootPath);
    var tasks = firebaseArray(taskListRef);
    tasks.$loaded().then(loadedCallback);

    function add (task) {
      tasks.$add(task);
    }

    function remove (task) {
      tasks.$remove(task);
    }

    function save (task) {
      return tasks.$save(task);
    }

    function all () {
      return tasks; 
    }

    function clearDone () {
      tasks.forEach(function (task) {
        if(task.done) remove(task);
      });
    }

    function doneAll () {
      tasks.forEach(function (task) {
        task.done = true;
        save(task);
      });
    }

    return {
      name: function () { return name; },
      all : all,
      add: add,
      remove: remove,
      save: save,
      clearDone: clearDone,
      doneAll: doneAll
    };
  }

  return TaskList;
}

module.exports = TaskListFactory;
