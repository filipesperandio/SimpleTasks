(function (exports) {
  var f = exports.f = {};

  f.byAttribute = function (attribute, value) {
    return function byAttribute (entry) { return entry[attribute] === value; };
  };

  f.pluck = function (attribute) {
    return function pluck (entry) { return entry[attribute]; };
  };

  f.equal = function () {
    var entries = Array.prototype.slice.call(arguments);
    return function equal (entry) { return entries.some(function (e) {
      return e === entry;
    }); };
  };

  f.toType = function (Type) {
    return function toType (entry) { return new Type(entry); };
  };

  f.not = function (toNegate) {
    return function not () { return !toNegate.apply(this, arguments); };
  };

})(typeof window !== 'undefined' ? window : global);
