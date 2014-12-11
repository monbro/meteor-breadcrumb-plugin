Package.describe({
  name: 'monbro:breadcrumb',
  summary: ' /* Fill me in! */ ',
  version: '1.0.0',
  git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.1');
  api.addFiles('monbro:breadcrumb.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('monbro:breadcrumb');
  api.addFiles('monbro:breadcrumb-tests.js');
});
