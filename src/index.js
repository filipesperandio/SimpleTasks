// Ionic Bundle includes Angular and other goodies.
require('promise.prototype.finally');
require('./lib/ionic/release/js/ionic.bundle');
require('./ionic.add.platform.class');
require('./ionic.lock.orientation');
require('./f');

// Currently this is only needed by datepicker-for-ionic
var $ = require('./lib/zepto/zepto.min'); // jshint ignore: line

require('angular-loading-bar');
require('angular-local-storage');
require('angular-focus-it');
require('angular-filter');
require('ngCordova');

require('app');
