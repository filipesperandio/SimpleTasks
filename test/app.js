global.angular = {}
global.angular.module = stub().returns(global.angular);
global.angular.config = stub().returns(global.angular);

describe('App', function () {
  it('does not blow', function () {
    var app = require('src/app');
    assert(app);
  });
});

