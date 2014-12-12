/* Package-scope variables */
var privateVar;

String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

var enrichRouteObject = function(path, isCurrent) {
    // replace all parameters in the title
    var title = Router.routes[path].options.title;
    var params = Router.current().params;
    if(title) {
        for (var i in params) {
            title = title.replace(
                new RegExp((':'+i).replace(/\+/g, "\\+"), "g"), params[i]);
        }
        title = title.capitalize();
    } else {
        title = 'This page has no title';

    }

    if(isCurrent) {
        cssClasses = 'active';
    } else {
        cssClasses = '';
    }

    return {
        'path': path,
        'params': params,
        'title': title,
        'cssClasses': cssClasses,
        'url': Router.routes[path].path(Router.current().params),
        'route': Router.routes[path]
    }
}

var getAllParents = function() {
    if(Router.current().route) {
      var current = Router.current().route.getName();
      var parent = Router.current().route.options.parent;
      if(parent) {
          return getParentParent([enrichRouteObject(current,true),enrichRouteObject(parent)]);

          // console.log(Router.routes[parent].path()); // working to the URL rendered for current path
          // console.log(Router.routes['discover.region'].path({'_name':'east'})); // working to the URL rendered for current path
          // console.log(Router.routes); // will list all routes
      } else {
          return [enrichRouteObject(current)];
      }
    } else {
      // no routes have been specified
      return [];
    }

}

// parents must be always an array
var getParentParent = function(parents) {
    // console.log(parents);
    if(newParent = Router.routes[parents[parents.length-1].path].options.parent) {
        parents.push(enrichRouteObject(newParent))
        return getParentParent(parents);
    } else {
        return parents;
    }
}

Breadcrumb = {
  hello: function() {
    return 'hello';
  },
  getAll: function() {
    return getAllParents().reverse();
  }
};

UI.registerHelper('Breadcrumb', function(template) {
  return Breadcrumb.getAll();
});