// Write your package code here!
(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;

/* Package-scope variables */
var Breadcrumb;

(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                               //
// packages/monbro:breadcrumb/monbro:iron-router-breadcrumb.js                                                       //
//                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////

Breadcrumb = function() {
  var self = this;
  var self._length = 100; // test

  self.length = function(number) {
    console.log('self length was called');
    return self._length+number;
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