describe('f', function () {
  it('wraps a function', function () {
    function fake (arg1, arg2) {
      return { arg1: arg1, arg2: arg2 };
    }

    var wrapped = f.wrap(fake);

    assert.deepEqual(wrapped(2, 1), { arg1: 2, arg2: 1 });
  });
});
