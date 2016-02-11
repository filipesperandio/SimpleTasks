describe('Task List', function () {
  var firebaseArrayMock = {
    $add: stub(),
    $remove: stub(),
    $save: stub(),
    $loaded: sinon.stub().resolves('loaded')
  };

  function firebaseArray (ref) {
    var arr = [{id:1,done:false},{id:2,done:true}];
    arr.$add = firebaseArrayMock.$add;
    arr.$remove = firebaseArrayMock.$remove;
    arr.$save = firebaseArrayMock.$save;
    arr.$loaded = firebaseArrayMock.$loaded;
    return arr;
  }

  function userFactory () {
    return {uid:123};
  }

  var callback = stub();

  var TaskListFactory = require('src/task.list');
  var firebase = { child: stub().returns('ref') };
  var task = {title: 'newtask'};
  var TaskList = new TaskListFactory(firebase, firebaseArray, userFactory);

  var taskList;

  beforeEach(function () {
    taskList = new TaskList('newlist', callback);
  });

  it('specify which list', function () {
    assert.equal(taskList.name(), 'newlist');
    assert.calledWith(firebase.child, '/usertasks/123/tasklists/newlist');
  });

  it('builds firebase array', function () {
    var fbArray = stub().returns(firebaseArrayMock);
    var TaskList = new TaskListFactory(firebase, fbArray, userFactory);
    new TaskList('something');
    assert.calledWith(fbArray, 'ref');
  });

  it('callback is invoked after load', function () {
    assert.called(callback);
  });

  it('adds task to the list', function () {
    taskList.add(task);
    assert.calledWith(firebaseArrayMock.$add, task);
  });

  it('lists all tasks from firebase', function () {
    var all = taskList.all();
    assert.lengthOf(all, 2);
  });

  it('clear all done', function () {
    taskList.clearDone();
    assert.calledWith(firebaseArrayMock.$remove, {id:2,done:true});
    assert.neverCalledWith(firebaseArrayMock.$remove, {id:1,done:false});
  });

  it('mark all as done', function () {
    taskList.doneAll();
    var done = taskList.all().filter(function(t) { return t.done });
    assert.lengthOf(done, 2);
    assert.called(firebaseArrayMock.$save);
  });

});
