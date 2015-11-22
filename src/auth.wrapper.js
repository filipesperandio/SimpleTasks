function AuthWrapper (Auth, $rootScope) {

  function userLoggedIn (authData) {
    $rootScope.$emit('login', authData);
  }

  function userLoggedOut () {
    $rootScope.$emit('logout');
  }

  function login (provider) {
    console.log('>>> Logging in');

    Auth.$authWithOAuthRedirect(provider).catch(function(error) {

      console.log('Not Logged in ', error);

      if (error.code === "TRANSPORT_UNAVAILABLE") {

        Auth.$authWithOAuthPopup("facebook").then(function(authData) {
          console.log('Logged in with popup', authData);
          userLoggedIn(authData);
        });

      } else {

        console.log(error);

      }

    });
  }

  function logout () {
    console.log('>>> Logging out');
    Auth.$unauth();
    userLoggedOut();
  }

  Auth.$onAuth(userLoggedIn);

  return {
    login: login,
    logout: logout,
    userLoggedIn: userLoggedIn,
    userLoggedOut: userLoggedOut
  };
}

module.exports = AuthWrapper;

