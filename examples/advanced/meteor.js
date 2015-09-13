/**
 * example configuration for the beadcrumb package
 */

// default values for the breadcrumb package are stored in the router configuration object as well
Router.configure({
  layoutTemplate: 'layout',
  defaultBreadcrumbTitle: 'My Default Title'
});

// Level 0
Router.route('/', {
  name: 'dashboard',
  template: 'dashboard',
  title: 'Dashboard',
  data: {name: 'Gandalf'}
});

Router.route('/analytics', {
  name: 'analytics',
  parent: 'dashboard',
  template: 'analytics',
  title: 'Analytics'
});

Router.route('/analytics/books', {
  name: 'analytics.books',
  parent: 'analytics',
  template: 'analyticsBooks',
  title: 'Category Books'
});

Router.route('/tags', {
  name: 'tags',
  parent: 'dashboard',
  template: 'tags',
  title: 'Taglist'
});

Router.route('/tag/:_name', {
  name: 'tag',
  parent: 'tags',
  template: 'tagDetail',
  title: 'Detailpage for :_name',
  data: function () {
    return this.params;
  },
});

Router.route('/default-title', {
  name: 'default.title',
  parent: 'dashboard',
  template: 'defaulttitle'
});

Router.route('/function-title/:_someparam', {
  name: 'function.title',
  parent: 'dashboard',
  template: 'functiontitle',
  data: {
    firstname: 'Gandalf',
    lastname: 'the Grey'
  },
  title: function() {
    var data = this.data();
    console.log('Our data object for this route:');
    console.log(data);
    console.log('');
    console.log('all given parameters for this route:');
    console.log(this.params);
    return 'Dynamic Title for '+data.firstname+' for route details: '+this.params['_someparam'];
  }
});

/**
 * example page specific stuff below here, just for demonstration purpose
 * you do not need this to make the breadcrumb package work
 */

// register a iron router template helper to check if the route is active
UI.registerHelper('isActiveRoute', function(routeName) {
    var currentRoute = Router.current();
    return currentRoute && routeName === currentRoute.route.getName() ? 'active' : '';
});

  // init tooltips for the example page
if (Meteor.isClient) {
  Template.layout.rendered = function() {
    $('[data-toggle="tooltip"]').tooltip({'trigger':'manual'});
    $('[data-toggle="tooltip"]').tooltip('show');
  };
}