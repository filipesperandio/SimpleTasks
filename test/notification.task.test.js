var NotificationTask = require('src/notification.task');

describe('NotificationTask', function () {
  var futureTask = {
    $id: 'asd123',
    title: 'future task',
    due: new Date(Date.now() + 10000).toJSON(),
    done: false
  };
  var pastTask = {
    title: 'past task',
    due: new Date(Date.now() - 10000).toJSON(),
    done: false
  }
  var doneTask = {
    title: 'done task',
    due: new Date(Date.now() + 10000).toJSON(),
    done: true
  };

  it('future task is schedulable', function () {
    var notificationTask = new NotificationTask(futureTask);
    assert.ok(notificationTask.schedulable());
    assert.instanceOf(notificationTask.at, Date);
  });

  it('past task is not schedulable', function () {
    var notificationTask = new NotificationTask(pastTask);
    assert.notOk(notificationTask.schedulable());
  });

  it('done task is not schedulable', function () {
    var notificationTask = new NotificationTask(doneTask);
    assert.notOk(notificationTask.schedulable());
  });

  it('has important attributes', function () {
    var notificationTask = new NotificationTask(futureTask);
    assert.deepEqual(notificationTask.at, new Date(futureTask.due));
    assert.ok(notificationTask.id > 0);
    assert.equal(notificationTask.text, futureTask.title);
    assert.equal(notificationTask.title, 'Yo! Remember this:');
  });


});
