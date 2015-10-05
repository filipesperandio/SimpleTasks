const SELENIUM_URL = process.env.SELENIUM_URL || 'http://localhost:4444/wd/hub';
const HTTP_PORT = process.env.HTTP_PORT || '8100';
const HTTP_HOST = process.env.HTTP_HOST || 'localhost';
const BASE_URL = process.env.BASE_URL || ('http://' + HTTP_HOST + ':' + HTTP_PORT)

exports.config = {
  seleniumAddress: SELENIUM_URL,
  baseUrl: BASE_URL,
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'mobileEmulation': {
        'deviceName': 'Apple iPhone 6'
      },
      'args': ['--window-size=400,745']
    }
  },
  specs: [ 'test/helper.js', 'test/**/*.test.js'],
  jasmineNodeOpts: {
    showColors: true,
  }
};
