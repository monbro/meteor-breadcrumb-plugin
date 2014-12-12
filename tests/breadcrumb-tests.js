Tinytest.add('hello world test', function (test) {
    test.equal(Breadcrumb.hello(), 'hello');
    test.equal(Breadcrumb.getAllParents(), []);
});
