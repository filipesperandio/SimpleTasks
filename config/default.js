var p = process;
var i = require('interpolate');

p.env.API_HOST = p.env.API_HOST || 'http://localhost:9292';
p.env.APP_TAG = p.env.APP_TAG || '0';

module.exports = {
  URL: {
    resource: i('{env.API_HOST}/resource', p)
  },
  buildInfo: {
    version: p.env.APP_TAG,
    apiHost: p.env.API_HOST
  },
};
