var extend = require('extend');
var defaultConfig = require('./default');

if (process.env.NODE_ENV) {
  var config = require('./' + process.env.NODE_ENV);
  extend(true, defaultConfig, config);
}

module.exports = defaultConfig;
