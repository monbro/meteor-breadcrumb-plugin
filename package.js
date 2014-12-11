Package.describe({
  name: 'monbro:iron-router-breadcrumb',
  summary: 'This package will provide a easy way to add a breadcrumb to Iron.Router with enough flexibility.',
  version: '1.0.0',
  git: 'https://github.com/monbro/meteor-breadcrumb-plugin/'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.addFiles('lib/breadcrumb.js');

  api.use([
    'templating',
    'ui',
    "iron:core",
  ], "client");

  api.export('Breadcrumb', ['client', 'server']);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('monbro:iron-router-breadcrumb');
  api.addFiles('monbro:iron-router-breadcrumb-tests.js');
});
