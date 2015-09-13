/**
 * example configuration for the beadcrumb package
 */

 // default values for the breadcrumb package are stored in the router configuration object as well
Router.configure({
  defaultBreadcrumbTitle: 'My Default Title',
  defaultBreadcrumbLastLink: false
});

// Level 0
Router.route('/', {
  name: 'dashboard',
  template: 'dashboard',
  title: 'Dashboard',
  data: {name: 'Gandalf'}
});

// when you navigate to "/one" automatically render the template named "One".
Router.route('/analytics', {
  name: 'analytics',
  parent: 'dashboard',
  template: 'analytics',
  showLink: false,
  title: 'Analytics'
});

// when you navigate to "/one" automatically render the template named "One".
Router.route('/analytics/books', {
  name: 'analytics.books',
  parent: 'analytics',
  template: 'analyticsBooks',
  title: 'Category Books'
});

// when you navigate to "/two" automatically render the template named "Two".
Router.route('/tags', {
  name: 'tags',
  parent: 'dashboard',
  template: 'tags',
  title: 'Taglist'
});

// when you navigate to "/one" automatically render the template named "One".
Router.route('/tag/:_name', {
  name: 'tag',
  parent: 'tags',
  template: 'tagDetail',
  title: 'Detailpage for :_name',
  data: function () {
    return this.params;
  },
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