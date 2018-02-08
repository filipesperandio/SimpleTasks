// This allows for requiring modules from the project root. Useful when
// requiring your SUT from the test. Example:
//    require('src/js/modules/app/application.controller'); vs.
//    require('../../../../src/js/modules/app/application.controller');
process.env.NODE_PATH = require('path').resolve(__dirname, '..');
require('module').Module._initPaths();
require('src/f');

require('promise.prototype.finally');

// Chai for assertions.
var chai = require('chai');
chai.use(require('chai-as-promised'));
global.assert = chai.assert;
global.cordova = {};
global.ionic = {};


// Sinon.JS for mocks, stubs and spies.
require('sinon-as-promised');
global.sinon = require('sinon');
sinon.assert.expose(chai.assert, { prefix: '' });
global.stub = sinon.stub;
global.match = sinon.match;
