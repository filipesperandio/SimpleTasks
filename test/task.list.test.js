describe('Task List', function () {
  var TaskListFactory = require('src/task.list');
  var firebase = { child: stub() };
  var firebaseArrayMock = { $add: sinon.spy(), $remove: stub(), $save: stub() }
  var firebaseArray = stub().returns(firebaseArrayMock);
  var user = {uid:123};
  var task = {title: 'newtask'};

  var TaskList = new TaskListFactory(firebase, firebaseArray, user);

  var taskList;

  beforeEach(function () {
    taskList = new TaskList('newlist');
  });

  it('specify which list', function () {
    assert.equal(taskList.name(), 'newlist');
    assert.calledWith(firebase.child, 'user/123/tasklists/newlist');
  });

  it('adds task to the list', function () {
    taskList.add(task);
    assert.calledWith(firebaseArrayMock.$add, task);
  });

  it('lists all tasks from firebase', function () {
    var all = taskList.all();
    assert.equal(all, firebaseArrayMock);
  });

});
