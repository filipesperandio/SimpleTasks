describe('Task List', function () {
  var TaskList = require('src/task.list');

  it('holds a list of tasks', function () {
    var taskList = new TaskList()
    assert.deepEqual(taskList.tasks(), []);
  });

});

