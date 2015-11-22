// Ionic Bundle includes Angular and other goodies.
require('promise.prototype.finally');
require('./lib/ionic/release/js/ionic.bundle');
require('./ionic.add.platform.class');
require('./ionic.lock.orientation');
require('./f');

require('angular-loading-bar');
require('angular-local-storage');
require('angular-focus-it');
require('angular-filter');
require('ngCordova');

var Firebase = require('firebase');
require('angularfire');

var app = angular.module('simple-tasks', [
  'ionic',
  'angular-loading-bar',
  'focusIt',
  'LocalStorageModule',
  'angular.filter',
  'ngCordova',
  'firebase'
]);


// Loading Bar  ================================================================
app.config(['cfpLoadingBarProvider', function (provider) {
  provider.includeSpinner = false;
}]);

// Local Storage Service =======================================================
app.config(['localStorageServiceProvider', function (provider) {
  provider.setPrefix('myapp');
}]);

function popTask (task) {
  var interval = task.due - new Date();
  setTimeout(function() {
    window.alert(task.title);
  }, interval);
}

app.service("firebaseRef", function() {
  return new Firebase("https://simple-tasks.firebaseio.com");
});

app.factory('Auth', [ 'firebaseRef', '$firebaseAuth', function (firebaseRef, $firebaseAuth) {
  return $firebaseAuth(firebaseRef);
}]);

app.service('authWrapper', require('./auth.wrapper'));


app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      window.StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: function($state, $rootScope, $ionicLoading, $scope, authWrapper, $timeout) {

      $rootScope.view = {};

      function checkUser () {
        console.log('Checking user', $rootScope.view.user);
        if(!$rootScope.view.user) {
          $rootScope.$emit('logout');
        } else {
          $rootScope.$emit('user-loaded', $rootScope.view.user);
        }
      }

      $timeout(checkUser, 30000);

      $rootScope.$on('login', function(event, user) {
        if(!user) {
          console.log('User not logged in');
          $rootScope.$emit('logout');
          return;
        }
        console.log('user uid', user.uid);
        $rootScope.view.user = user;
        $rootScope.$emit('user-loaded', user);
      });

      $rootScope.$on('logout', function () {
        console.log('logout');
        $ionicLoading.hide();
        $rootScope.view.user = undefined;
      });

      $scope.logout = authWrapper.logout;

      $scope.tasklist = {
        lists: [],
        newList: {}
      };

      $scope.createList = function(listName) {
        $scope.tasklist.lists.unshift({name: listName});
        $scope.tasklist.newList.name = '';
      };

      $scope.facebookLogin = function facebookLogin () {
        $ionicLoading.show();
        console.log('>>> Login', $rootScope.view.user);
        authWrapper.login('facebook');
      };

    }
  })

  .state('app.tasks', {
    url: '/tasks/:name',
    views: {
      'menuContent': {
        templateUrl: 'templates/tasklist.html',
        controller: function($state, $ionicPopup, $ionicLoading, $scope, $rootScope, $stateParams, $firebaseArray, firebaseRef) {
          var listName = $stateParams.name || 'personal';

          $scope.tasklist = {
            name: listName,
            tasks: [],
            newTask: {},
          };

          function loadTasks () {
            console.log('Loading tasks...');
            $ionicLoading.show();
            $scope.tasklist.tasks = $firebaseArray(firebaseRef.child("/usertasks/"+$rootScope.view.user.uid));
            $scope.tasklist.tasks.$loaded().then($ionicLoading.hide);
          }

          if($rootScope.view.user) loadTasks();

          $rootScope.$on('user-loaded', loadTasks);

          $scope.save = function (task) {
            $scope.tasklist.tasks.$save(task);
            console.log('saving', task);
          };

          $scope.clearDone = function clearDone () {
            $scope.tasklist.tasks.forEach(function (task) {
              if(task.done) $scope.tasklist.tasks.$remove(task);
            });
          };

          $scope.pickDate = function pickDate (task) {
            var scope = $scope;
            scope.task = task;
            task.due = task.due || new Date();

            var datePickPopUp = $ionicPopup.show({
              template: '<input type="datetime-local" ng-model="task.due">',
              title: 'Alarm',
              subTitle: 'The time you want to be reminded',
              scope: scope,
              buttons: [
                { text: 'Unset' },
                {
                  text: '<b>Set Alarm</b>',
                  type: 'button-dark',
                  onTap: function(e) {
                    if (!scope.task.due) {
                      e.preventDefault();
                    } else {
                      return scope.task.due;
                    }
                  }
                }
              ]
            });

            datePickPopUp.then(function(res) {
              if(!res) {
                scope.task.due = undefined;
              }
              popTask(scope.task);
              scope.save(scope.task);
              console.log('Tapped!', res);
            });
          };

          $scope.createTask = function(taskTitle) {
            var newTask = {title: taskTitle, done:false, createdAt:  Firebase.ServerValue.TIMESTAMP};
            console.log(JSON.stringify(newTask));
            $scope.tasklist.tasks.$add(newTask);
            $scope.tasklist.newTask.title = '';
          };

        }
      }
    }
  });

  $urlRouterProvider.otherwise('/app/tasks/personal');
});
