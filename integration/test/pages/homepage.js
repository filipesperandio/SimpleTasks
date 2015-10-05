function HomePage () {
  var self = this;

  self.navigate = function navigate() {
    browser.get('#/app/home');
    return self;
  };

  return self;
}

module.exports = new HomePage();
