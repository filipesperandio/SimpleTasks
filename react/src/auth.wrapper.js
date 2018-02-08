function AuthWrapper (Auth, $rootScope) {

  function notify (authData) {
    if(authData) {
      $rootScope.$emit('login', authData);
    } else {
      $rootScope.$emit('logout');
    }
  }

  function login (provider) {
    Auth.$authWithOAuthPopup(provider).then(notify);
  }

  function logout () {
    Auth.$unauth();
  }

  Auth.$onAuth(notify);

  return {
    login: login,
    logout: logout,
    notify: notify
  };
}

module.exports = AuthWrapper;

