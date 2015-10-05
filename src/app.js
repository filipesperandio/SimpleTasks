var app = angular.module('mobile-template', [
  'ionic',
  'angular-loading-bar',
  'focusIt',
  'LocalStorageModule',
  'angular.filter',
  'ngCordova'
]);


// Loading Bar  ================================================================
app.config(['cfpLoadingBarProvider', function (provider) {
  provider.includeSpinner = false;
}]);

// Local Storage Service =======================================================
app.config(['localStorageServiceProvider', function (provider) {
  provider.setPrefix('pfConnect');
}]);

