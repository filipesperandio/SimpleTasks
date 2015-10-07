function TaskListFactory (firebase, firebaseArray, user) {

  function TaskList (name) {
    var rootPath = 'user/' + user.uid + '/tasklists/' + name;
    var taskListRef = firebase.child(rootPath);
    var tasks = firebaseArray(taskListRef);

    function add (task) {
      tasks.$add(task);
    }

    function remove (task) {
      tasks.$remove(task);
    }

    function save (task) {
      tasks.$save(task);
    }

    function all () {
      return tasks; 
    }

    return {
      name: function () { return name; },
      all : all,
      add: add,
      remove: remove,
      save: save
    };
  }

  return TaskList;
}

module.exports = TaskListFactory;
