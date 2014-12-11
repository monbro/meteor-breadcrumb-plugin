Package.describe({
  name: 'monbro:iron-router-breadcrumb',
  summary: 'This package will provide a easy way to add a breadcrumb to Iron.Router with enough flexibility.',
  version: '1.0.1',
  git: 'https://github.com/monbro/meteor-breadcrumb-plugin/'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.addFiles('lib/breadcrumb.js');

  api.use([
    'templating',
    'meteor',
    'ui',
    "iron:core@1.0.0",
  ], "client");

  // main namespace and utils
  api.use('iron:core@1.0.0');

  // ui layout
  api.use('iron:layout@1.0.0');

  // connect like middleware stack for client/server
  api.use('iron:middleware-stack@1.0.0');

  // client and server side url utilities and compiling
  api.use('iron:url@1.0.0');

  // for reactive urls and pushState in the browser
  api.use('iron:location@1.0.0');

  // for RouteController which inherits from this
  api.use('iron:controller@1.0.0');

  api.export('Breadcrumb', ['client', 'server']);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('monbro:iron-router-breadcrumb');
  api.addFiles('lib/breadcrumb-tests.js');
});
