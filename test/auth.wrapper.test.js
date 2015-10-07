describe('AuthWrapper', function () {
  var AuthWrapper = require('src/auth.wrapper');

  var Auth = { 
    $authWithOAuthRedirect: stub().resolves({}),
    $onAuth: stub()
  };
  var $rootScope = { $emit: stub() };

  var authData = {};
  var authWrapper;

  beforeEach(function () {
    authWrapper = new AuthWrapper(Auth, $rootScope);
  });

  it('login uses redirect method', function () {
    authWrapper.login('google');
    assert.calledWith(Auth.$authWithOAuthRedirect, 'google');
  });

  it('emits a logout event', function () {
    authWrapper.userLoggedOut();
    assert.calledWith($rootScope.$emit, 'logout');
  });

  it('emits a login event', function () {
    authWrapper.userLoggedIn(authData);
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

