var homePage = require('./pages/homepage');


describe('app', function() {
  it('opens homepage', function() {
    var page = homePage.navigate();
    expect(page).not.toBe(null);
  });
});

