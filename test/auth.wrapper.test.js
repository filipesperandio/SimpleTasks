describe('AuthWrapper', function () {
  var AuthWrapper = require('src/auth.wrapper');

  var Auth = { 
    $authWithOAuthPopup: stub().resolves({}),
    $onAuth: stub(),
    $unauth: stub()
  };
  var $rootScope = { $emit: stub() };

  var authData = {};
  var authWrapper;

  beforeEach(function () {
    authWrapper = new AuthWrapper(Auth, $rootScope);
  });

  it('login uses redirect method', function () {
    authWrapper.login('google');
    assert.calledWith(Auth.$authWithOAuthPopup, 'google');
  });

  it('emits a logout event', function () {
    authWrapper.notify();
    assert.calledWith($rootScope.$emit, 'logout');
  });

  it('emits a login event', function () {
    authWrapper.notify(authData);
    assert.calledWith($rootScope.$emit, 'login', authData);
  });

  it('logout', function () {
    authWrapper.logout();
    assert.calledWith($rootScope.$emit, 'logout');
  });

  it('register auth callback on constructor', function () {
    assert.called(Auth.$onAuth);
  });

});

