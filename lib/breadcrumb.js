// Write your package code here!
(function () {

/* Package-scope variables */
var Breadcrumb;

(function () {

Breadcrumb = function() {
  var self = this;
  var _length = 100; // test

  self.length = function(number) {
    console.log('self length was called');
    return _length+number;
  };

  self.insert = function(key, value) {
    console.log('self Insers was called');
  };                                                                                                                                                                                   // 132
};

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['monbro:iron-router-breadcrumb'] = {
  Breadcrumb: Breadcrumb
};

})();

// register a template helper function
UI.registerHelper('Breadcrumb', function(template) {
    return 'this/is/a/sample/breadcrumb';
});