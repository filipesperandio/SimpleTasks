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

app.run([ '$rootScope', require('./feature.flags')]);

// Loading Bar  ================================================================
app.config(['cfpLoadingBarProvider', function (provider) {
  provider.includeSpinner = false;
}]);

// Local Storage Service =======================================================
app.config(['localStorageServiceProvider', function (provider) {
  provider.setPrefix('myapp');
}]);

app.service("firebaseRef", function() {
  return new Firebase("https://simple-tasks.firebaseio.com");
});

app.factory('Auth', [ 'firebaseRef', '$firebaseAuth', function (firebaseRef, $firebaseAuth) {
  return $firebaseAuth(firebaseRef);
}]);

app.service('authWrapper', require('./auth.wrapper'));

app.factory('userFactory', [ '$rootScope', function ($rootScope) {
  return function () { return $rootScope.view.user; };
}]);

app.factory('TaskList', [ 'firebaseRef', '$firebaseArray', 'userFactory', require('./task.list') ]);

function notificationTest () {
  cordova.plugins.notification.local.schedule({
    id: 10,
    title: "Hey reminder for you!",
    text: "task test 1",
    at: new Date()
  });

  cordova.plugins.notification.local.on("click", function (notification) {
    console.log("Notification", notification);
    alert(notification.text);
  }, {});
}

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

    notificationTest();
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: function($state, $rootScope, $ionicLoading, $scope, authWrapper) {

      $rootScope.view = {};

      $rootScope.$on('login', function(event, user) {
        if(!user) {
          $rootScope.$emit('logout');
          return;
        }
        $rootScope.view.user = user;
        $rootScope.$emit('user-loaded', user);
      });

      $rootScope.$on('logout', function () {
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
        authWrapper.login('facebook');
      };

    }
  })

  .state('app.tasks', {
    url: '/tasks/:name',
    views: {
      'menuContent': {
        templateUrl: 'templates/tasklist.html',
        controller: function(TaskList, $ionicPopup, $ionicLoading, $scope, $rootScope, $stateParams) {
          var listName = $stateParams.name || 'personal';
          var tasklist;

          $scope.vm = {
            name: listName,
            tasks: [],
            newTask: {},
          };

          function loadTasks () {
            $ionicLoading.show();
            tasklist = new TaskList('personal', $ionicLoading.hide);
            $scope.vm.tasks = tasklist.all();
          }

          if($rootScope.view.user) loadTasks();

          $rootScope.$on('user-loaded', loadTasks);

          $scope.doneAll = function doneAll () {
            tasklist.doneAll();
          };

          $scope.save = function (task) {
            tasklist.save(task);
          };

          $scope.clearDone = function clearDone () {
            tasklist.clearDone();
          };

          $scope.pickDate = function pickDate (task) {
            var scope = $scope.$new();
            scope.vm = {
              date : task.due ? new Date(task.due) : new Date()
            };

            var datePickPopUp = $ionicPopup.show({
              template: '<input type="datetime-local" ng-model="vm.date">',
              title: 'Alarm',
              subTitle: 'The time you want to be reminded',
              scope: scope,
              buttons: [
                { text: 'Unset' },
                {
                  text: '<b>Set Alarm</b>',
                  type: 'button-dark',
                  onTap: function() {
                    return scope.vm.date;
                  }
                }
              ]
            });

            datePickPopUp.then(function(date) {
              task.due = !!date ? date.toJSON() : undefined;
              tasklist.save(task);
            });
          };

          $scope.createTask = function(taskTitle) {
            tasklist.add({
              title: taskTitle,
              done: false,
              createdAt: Firebase.ServerValue.TIMESTAMP
            });
            $scope.vm.newTask.title = '';
          };

        }
      }
    }
  });

  $urlRouterProvider.otherwise('/app/tasks/personal');
});
